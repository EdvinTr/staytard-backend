import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateSku } from '../../utils/generate-sku.util';
import { CreateProductInput } from './dto/create-product-input.dto';
import { GetProductsInput } from './dto/get-products-input.dto';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductColor } from './entities/product-color.entity';
import { ProductSize } from './entities/product-size.entity';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async findAll({ limit, offset, categorySlug }: GetProductsInput) {
    const realLimit = limit > 50 ? 50 : limit;

    // need category with categorySlug, then get all the children of that category as well
    const [products, count] = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('category.children', 'children')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.images', 'images')
      .innerJoinAndSelect('product.attributes', 'attributes')
      .innerJoinAndSelect('attributes.color', 'color')
      .innerJoinAndSelect('attributes.size', 'size')
      .skip(offset)
      .take(realLimit)
      .where('category.slug = :categorySlug', { categorySlug })
      .getManyAndCount();

    /* const [products, count] = await this.productRepository.findAndCount({
      take: realLimit,
      skip: offset,
      where: {
        category: {
          slug: categorySlug,
        },
      },
    }); */

    return {
      products,
      count,
    };
  }
  public async create(input: CreateProductInput) {
    try {
      const { attributes, ...rest } = input;
      const product = this.productRepository.create({
        ...rest,
        images: [
          ...input.imageUrls.map((url) => {
            return {
              imageUrl: url,
            };
          }),
        ],
        category: {
          id: input.categoryId,
        },
        brand: {
          id: input.brandId,
        },
      });
      const attrs: ProductAttribute[] = attributes.map((attribute) => {
        const color = new ProductColor();
        const size = new ProductSize();
        color.value = attribute.color.value;
        size.value = attribute.size.value;
        return {
          color: color,
          quantity: attribute.quantity,
          size: size,
          sku: generateSku(product.name, color.value, size.value),
          product: product,
        };
      });
      product.attributes = attrs;
      return this.productRepository.save(product);
    } catch (err) {}
  }
}
