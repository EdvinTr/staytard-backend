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
          name: 'Pants', // TODO: replace with categoryName
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
        if (!brand) {
          continue;
        }
        const randomCategory =
          category.children[
            Math.floor(Math.random() * category.children.length)
          ]; // get random child category

        if (usedProductNames.includes(item.name)) {
          // product name has to be unique, skip if we already have it
          continue;
        }
        const product = Product.create({
          name: item.name,
          description: item.description,
          unitPrice: item.unitPrice,
          brand,
          category: randomCategory,
          images: [
            ...item.images.map((url) => {
              const image = new ProductImage();
              image.imageUrl = url;
              return image;
            }),
          ],
        });
        product.attributes = [
          ...item.attributes.map((attr) => {
            return {
              ...attr,
              product: product,
            };
          }),
        ];
        usedProductNames.push(item.name);
        productsToSave.push(product);
      }

      await Product.save(productsToSave);
    } catch (err) {
      console.log(err);
    }
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
