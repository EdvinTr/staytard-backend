import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input.dto';
import { ProductImage } from './entities/product-image.entity';
import { ProductOptionValue } from './entities/product-option-value.entity';
import { ProductOption } from './entities/product-option.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(options?: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find({
      ...options,
    });
  }

  async create(input: CreateProductInput) {
    // create product entry
    const product = new Product();
    product.name = input.name;
    product.description = input.description;
    product.originalPrice = input.originalPrice;
    product.currentPrice = input.currentPrice;
    product.categoryId = input.categoryId;
    product.brandId = input.brandId;
    const savedProduct = await this.productRepository.save(product);

    // set images
    const productImages = input.imageUrls.map((url) => {
      const productImage = new ProductImage();
      productImage.imageUrl = url;
      return productImage;
    });
    savedProduct.images = productImages;
    const savedProductTwo = await this.productRepository.save(savedProduct);

    // set options
    const productOptions = input.options.map((option) => {
      const productOption = new ProductOption();
      productOption.name = option.optionName;
      productOption.values = option.optionValues.map((value) => {
        const productOptionValue = new ProductOptionValue();
        productOptionValue.name = value;
        return productOptionValue;
      });
      return productOption;
    });
    savedProductTwo.options = productOptions;
    return await this.productRepository.save(savedProductTwo);
  }

  /*   async create(input: CreateProductInput) {
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
      options: [
        ...input.options.map((option: CreateProductOptionInput) => {
          return {
            optionName: option.optionName,
            optionValues: [
              ...option.optionValues.map((value: string) => {
                return {
                  valueName: value,
                };
              }),
            ],
          };
        }),
      ],
    });
    console.log(product);

    return this.productRepository.save(product);
  } */
}
