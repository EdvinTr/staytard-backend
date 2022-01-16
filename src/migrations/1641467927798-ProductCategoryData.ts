import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  accessoriesCategories,
  clothesCategories,
  lifestyleCategories,
  shoesCategories,
} from '../migration-utils/category.data';
import { ProductCategory } from '../modules/product-category/entities/product-category.entity';
export class ProductCategoryData1641467927798 implements MigrationInterface {
  public async up(): Promise<void> {
    await ProductCategory.create(clothesCategories).save();
    await ProductCategory.create(lifestyleCategories).save();
    await ProductCategory.create(shoesCategories).save();
    await ProductCategory.create(accessoriesCategories).save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product_category`);
  }
}
