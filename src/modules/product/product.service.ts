import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(options?: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find(options);
  }

  async create(input: CreateProductInput) {
    const product = this.productRepository.create({
      ...input,
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
    return this.productRepository.save(product);
  }
}
