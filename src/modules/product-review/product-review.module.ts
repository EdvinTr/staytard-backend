import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewResolver } from './product-review.resolver';
import { ProductReviewService } from './product-review.service';

@Module({
  providers: [ProductReviewResolver, ProductReviewService],
  imports: [TypeOrmModule.forFeature([ProductReview])],
})
export class ProductReviewModule {}
