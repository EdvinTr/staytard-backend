import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductOrderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
