import * as casual from 'casual';
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
      const categoryRepository =
        queryRunner.manager.getRepository(ProductCategory);
      const brandRepository = queryRunner.manager.getRepository(ProductBrand);

      const filePath = path.join(
        process.cwd(),
        'src',
        'migration-utils',
        'products.json',
      );
      const data = await readFile(filePath);
      const jsonData: { products: GeneratedProduct[]; categoryName: string }[] =
        JSON.parse(data.toString());

      const allBrands = await brandRepository.find({});
      for (const { categoryName, products: generatedProducts } of jsonData) {
        const category = await categoryRepository.findOne({
          relations: ['children'],
          where: {
            name: categoryName,
          },
        });
        if (!category) {
          continue;
        }
        for (const item of generatedProducts) {
          let brand = await brandRepository.findOne({
            where: { name: item.brandName },
          });
          if (!brand) {
            brand = allBrands[casual.integer(0, allBrands.length - 1)];
          }

          let actualCategory = category;
          if (Math.random() > 0.4 && category.children.length !== 0) {
            // randomly add the product to a child category with 40% chance, makes sense right?
            const randomCategory =
              category.children[
                Math.floor(Math.random() * category.children.length)
              ];
            actualCategory = randomCategory;
          }
          const product = Product.create({
            name: item.name,
            description: item.description,
            unitPrice: item.unitPrice,
            brand,
            category: actualCategory,
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
          await Product.save(product).catch((err) => console.log(err)); // catching error here to avoid crash on unique constraint failure
        }
      }
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
