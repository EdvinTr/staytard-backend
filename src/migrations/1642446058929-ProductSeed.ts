import { readFile } from 'fs/promises';
import * as path from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { GeneratedProduct } from '../migration-utils/product-seed.script';
import { ProductBrand } from '../modules/product-brand/entities/product-brand.entity';
import { ProductCategory } from '../modules/product-category/entities/product-category.entity';
import { ProductImage } from '../modules/product/entities/product-image.entity';
import { Product } from '../modules/product/entities/product.entity';
export class ProductSeed1642446058929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
    } catch (err) {}
    const filePath = path.join(
      process.cwd(),
      'src',
      'migration-utils',
      'products.json',
    );
    const data = await readFile(filePath);
    const {
      products,
      categoryName,
    }: { products: GeneratedProduct[]; categoryName: string } = JSON.parse(
      data.toString(),
    );
    const brandRepository = queryRunner.manager.getRepository(ProductBrand);
    const categoryRepository =
      queryRunner.manager.getRepository(ProductCategory);

    const category = await categoryRepository.findOne({
      relations: ['children'],
      where: {
        name: 'Pants',
      },
    });
    if (!category) {
      throw new Error();
    }
    const usedProductNames: string[] = [];
    const productsToSave: Product[] = [];
    for (const item of products) {
      const brand = await brandRepository.findOne({
        where: { name: item.brandName },
      });
      const randomCategory =
        category.children[Math.floor(Math.random() * category.children.length)];
      if (!brand) {
        console.log('---- Brand not found ----- : ', item.brandName);
        continue;
      }

      if (usedProductNames.includes(item.name)) {
        continue;
      }

      const product = new Product();
      product.name = item.name;
      product.brand = brand;
      product.description = item.description;
      product.unitPrice = item.unitPrice;
      product.images = [
        ...item.images.map((url) => {
          const image = new ProductImage();
          image.imageUrl = url;
          return image;
        }),
      ];
      product.attributes = [
        ...item.attributes.map((attr) => {
          return {
            ...attr,
            product: product,
          };
        }),
      ];
      product.category = randomCategory;

      usedProductNames.push(item.name);
      productsToSave.push(product);
    }

    await Product.save(productsToSave);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            TRUNCATE product CASCADE;
        `);
    await queryRunner.query(`
            DELETE FROM product_color;
        `);
    await queryRunner.query(`
        DELETE FROM product_size;
    `);
  }
}
