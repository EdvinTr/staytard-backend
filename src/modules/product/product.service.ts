import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { generateSku } from '../../utils/generate-sku.util';
import { getOffset, paginate } from '../../utils/paginate.util';
import { CreateProductInput } from './dto/create-product.input';
import { FindProductsDto } from './dto/find-products.dto';
import { FindProductsInput } from './dto/find-products.input';
import { QueryProductsOutput } from './dto/query-products.output';
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

  public async findOne(id: number, options?: FindOneOptions<Product>) {
    const prod = await this.productRepository.findOne(id, options);
    return prod;
  }

  public async restFindAll({ page, limit, categoryPath }: FindProductsDto) {
    try {
      const realPage = page ? page : 1;
      const realLimit = limit > 50 ? 50 : limit;
      const offset = getOffset(realPage, realLimit); // get offset for pagination
      const [products, totalCount] = await this.productRepository.findAndCount({
        take: realLimit,
        skip: offset,
        relations: ['category', 'brand'],
        where: {
          category: {
            path: Like(`%${categoryPath}%`),
          },
        },
      });
      const pagination = paginate(realPage, totalCount, realLimit); // create pagination
      return {
        pagination,
        products,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong when loading products',
      );
    }
  }

  public async gqlFindAll({
    limit,
    offset,
    categoryPath,
    sortBy,
    sortDirection,
  }: FindProductsInput): Promise<QueryProductsOutput> {
    const orderBy: Record<string, string> = {};
    if (sortBy && sortDirection) {
      orderBy[sortBy] = sortDirection;
    }
    const [products, totalCount] = await this.productRepository.findAndCount({
      take: limit,
      skip: offset,
      where: {
        category: {
          path: Like(`%${categoryPath}%`),
        },
      },
      relations: ['category', 'brand'],
      cache: {
        id: `${categoryPath}-${limit}-${offset}`,
        milliseconds: 60000, // 60 seconds
      },
      order: {
        ...orderBy,
      },
    });
    return {
      items: products,
      totalCount,
      hasMore: totalCount - offset > limit,
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
