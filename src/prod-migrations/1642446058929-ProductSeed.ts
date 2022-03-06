import * as casual from 'casual';
import { readFile } from 'fs/promises';
import * as path from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { GeneratedProduct } from '../migration-utils/product-seed.script';
import { ProductBrand } from '../modules/product-brand/entities/product-brand.entity';
import { ProductCategory } from '../modules/product-category/entities/product-category.entity';
import { ProductColor } from '../modules/product/entities/product-color.entity';
import { ProductImage } from '../modules/product/entities/product-image.entity';
import { ProductSize } from '../modules/product/entities/product-size.entity';
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
      for (const {
        categoryName,
        products: generatedProducts,
      } of jsonData.slice(0, 10)) {
        const category = await categoryRepository.findOne({
          relations: ['children'],
          where: {
            name: categoryName,
          },
        });
        if (!category) {
          continue;
        }
        for (const item of generatedProducts.slice(0, 100)) {
          let brand = await brandRepository.findOne({
            where: { name: item.brandName },
          });
          if (!brand) {
            brand = allBrands[casual.integer(0, allBrands.length - 1)]; // select a random brand if it was not found in DB
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
          // images currently stored in DB
          const storedImages = (await ProductImage.find({})).map(
            (img) => img.imageUrl,
          );
          // images to save before filtering
          const productImages = [
            ...item.images.map((url) => {
              const image = new ProductImage();
              image.imageUrl = url;
              return image;
            }),
          ];
          // filter duplicates if we have them in the DB
          const imagesToSave = productImages.filter(
            (img) => !storedImages.includes(img.imageUrl),
          );
          const product = Product.create({
            name: item.name,
            description: item.description,
            currentPrice: item.currentPrice,
            originalPrice: item.originalPrice,
            brand,
            category: actualCategory,
            images: [...imagesToSave],
          });
          // fetch the color/size to avoid storing duplicates
          const availableSizes = await ProductSize.find({});
          const availableColors = await ProductColor.find({});
          product.attributes = [
            ...item.attributes.map((attr, idx) => {
              const storedSize = availableSizes.find(
                (size) => size.value === attr.size.value,
              );
              const storedColor = availableColors.find(
                (color) => color.value === attr.color.value,
              );
              return {
                product: product,
                quantity: attr.quantity,
                color: storedColor || attr.color,
                size: storedSize || attr.size,
                sku: attr.sku + idx,
              };
            }),
          ];
          await Product.save(product).catch((err) => console.log(err)); // catching error here to avoid crash on unique constraint failure...great solution.
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
