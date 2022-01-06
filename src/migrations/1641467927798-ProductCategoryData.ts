import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductCategory } from '../modules/product-category/entities/product-category.entity';
export class ProductCategoryData1641467927798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const jackets = new ProductCategory();
    jackets.name = 'Jackets';
    jackets.description = 'The description here';

    const child1 = ProductCategory.create({
      name: 'Jackets',
      description: 'The description here',
    });
    const child2 = ProductCategory.create({
      name: 'Jeans jackets',
      description: 'The description here',
    });
    jackets.children = [child1, child2];
    await jackets.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await ProductCategory.delete({});
  }
}
