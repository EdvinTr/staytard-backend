import { Field, ObjectType } from '@nestjs/graphql';
import { IPagination } from '../../../lib/typings/IPagination.interface';
import { Product } from '../entities/product.entity';

@ObjectType()
export class QueryProductsOutput implements IPagination<Product> {
  @Field(() => [Product])
  items: Product[];

  @Field()
  totalCount: number;

  @Field()
  hasMore: boolean;
}
