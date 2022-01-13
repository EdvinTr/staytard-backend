import { MigrationInterface, QueryRunner } from 'typeorm';
import productBrandsData from '../migration-utils/product-brands.data';
import { ProductBrand } from '../modules/product/entities/product-brand.entity';
export class ProductBrandSeed1642022077781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productBrands = productBrandsData.map((productBrand) => {
      const path = productBrand.toLowerCase().split(' ').join('-');
      return ProductBrand.create({
        name: productBrand,
        path,
      });
    });
    await ProductBrand.save(productBrands);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "product_brand"`);
  }
}
