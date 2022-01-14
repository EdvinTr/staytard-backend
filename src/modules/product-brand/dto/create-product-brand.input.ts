import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductBrandInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
