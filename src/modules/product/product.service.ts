import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input.dto';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductImage } from './entities/product-image.entity';
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

    // set options
    const productOptions = input.attributes.map((option) => {
      const attribute = new ProductAttribute();
      attribute.name = option.name;
      // set option values for this option
      const attributeValues = option.values.map((value) => {
        const attributeValue = new ProductAttributeValue();
        attributeValue.name = value;
        return attributeValue;
      });
      attribute.values = attributeValues;
      return attribute;
    });
    savedProduct.attributes = productOptions;

    // resave with to update relations
    return this.productRepository.save(savedProduct);
  }

  /* async create(input: CreateProductInput) {
    const { options, ...rest } = input;
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
      options: [
        ...options.map((option:CreateProductOptionInput) => {
          return {
            name: option.optionName,
            values: [
              ...option.optionValues.map((value:string) => {
                return {
                  name: value,

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
