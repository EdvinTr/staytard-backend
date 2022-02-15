import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { generateSku } from '../../utils/generate-sku.util';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductColor } from './entities/product-color.entity';
import { ProductSize } from './entities/product-size.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize)
    private readonly sizeRepository: Repository<ProductSize>,
  ) {}
  public async find(
    options?: FindManyOptions<ProductAttribute>,
  ): Promise<ProductAttribute[]> {
    return this.productAttributeRepository.find(options);
  }

  public async update(
    criteria: FindConditions<ProductAttribute>,
    partialEntity: QueryDeepPartialEntity<ProductAttribute>,
  ) {
    return this.productAttributeRepository.update(criteria, partialEntity);
  }

  public async deleteByProductId(id: number) {
    return this.productAttributeRepository.delete({ product: { id } });
  }
  public async save(attributes: ProductAttribute[]) {
    return this.productAttributeRepository.save(attributes);
  }

  public async create(
    attributes: CreateProductAttributeInput[],
    product: Product,
  ) {
    const createdAttributes: any[] = [];
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      const dbColor = await this.colorRepository.findOne({
        where: { value: attribute.color.value }, // TODO: lower case
      });
      let color = new ProductColor();
      if (dbColor) {
        color = dbColor; // If color already exists, use it
      } else {
        color.value = attribute.color.value;
      }

      const dbSize = await this.sizeRepository.findOne({
        where: { value: attribute.size.value },
      });
      let size = new ProductSize();
      if (dbSize) {
        size = dbSize; // If size already exists, use it
      } else {
        size.value = attribute.size.value; // If size doesn't exist, create it
      }
      const attr = {
        color: color,
        quantity: attribute.quantity,
        size: size,
        sku: generateSku(product.name, color.value, size.value),
        product: product,
      };
      createdAttributes.push(attr);
    }
    return createdAttributes;
  }

  /*  private async createNewColor(color: string) {
    const newColor = new ProductColor();
    newColor.value = color;
    return this.colorRepository.save(newColor);
  }

  private async createNewSize(size: string) {
    const newSize = new ProductSize();
    newSize.value = size;
    return this.sizeRepository.save(newSize);
  } */
}
