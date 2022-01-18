import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class QueryProductsOutput {
  @Field(() => [Product])
  products: Product[];

  @Field()
  totalCount: number;
}
