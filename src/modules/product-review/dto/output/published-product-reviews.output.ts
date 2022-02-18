import { Field, ObjectType } from '@nestjs/graphql';
import { IPagination } from '../../../../lib/typings/IPagination.interface';
import { ProductReview } from '../../entities/product-review.entity';

@ObjectType()
export class PublishedProductReviewsOutput
  implements IPagination<ProductReview>
{
  @Field(() => [ProductReview])
  items: ProductReview[];

  @Field()
  totalCount: number;

  @Field()
  hasMore: boolean;

  @Field()
  averageRating: number;
}
