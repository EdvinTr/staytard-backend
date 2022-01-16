import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input.dto';
import { ProductColor } from './entities/product-color.entity';
import { ProductSize } from './entities/product-size.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async findAll(options?: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find({
      ...options,
    });
  }
  async create(input: CreateProductInput) {
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
      attributes: [
        /*   ...attributes.map((attribute) => ({
          quantity: attribute.quantity,
          size: attribute.size,
          color: attribute.color,
          sku: 'hello',
        })), */
        /*  {
          size: { value: 'XL' },
          color: { value: 'black' },
          quantity: 20,
          sku: 'hello',
        },
        {
          size: { value: 'M' },
          color: { value: 'black' },
          quantity: 20,
          sku: 'hello',
        }, */
      ],
    });

    const color = new ProductColor();
    color.value = attributes[0].color.value;

    const size = new ProductSize();
    size.value = attributes[0].size.value;
    product.attributes = [
      { color, quantity: attributes[0].quantity, size, sku: 'hello', product },
    ];

    return this.productRepository.save(product);
  }
}
