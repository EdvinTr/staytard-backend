import * as casual from 'casual';
import * as _ from 'lodash';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductReview } from '../modules/product-review/entities/product-review.entity';
import { Product } from '../modules/product/entities/product.entity';
export class SeedProductReviews1644490503552 implements MigrationInterface {
  public async up(): Promise<void> {
    const currentProducts: Product[] = await Product.find({});

    const shuffledProducts = _.shuffle(currentProducts);
    const slicedProducts = shuffledProducts.slice(
      0,
      Math.floor(shuffledProducts.length / 6),
    );
    for (let i = 0; i < 500; i++) {
      const productId =
        slicedProducts[casual.integer(0, slicedProducts.length - 1)].id;
      const isPublished = casual.boolean;
      const review = new ProductReview();
      review.productId = productId;
      review.isPublished = isPublished;
      review.title = casual.title;
      review.content = casual.sentences(casual.integer(3, 8));
      review.wouldRecommend = casual.boolean;
      review.rating = casual.integer(1, 5);
      review.nickname = casual.username;
      review.email = casual.email;
      review.publishedAt = isPublished ? new Date() : null;
      await ProductReview.save(review);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product_review;`);
  }
}
