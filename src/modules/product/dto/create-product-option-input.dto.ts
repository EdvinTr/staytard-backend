import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum ATTRIBUTE_TYPE {
  SIZE = 'Size',
  COLOR = 'Color',
}
registerEnumType(ATTRIBUTE_TYPE, {
  name: 'AttributeType',
  description: 'The basic attributes of products',
});

@InputType()
export class CreateProductAttributeInput {
  @Field(() => ATTRIBUTE_TYPE)
  name: ATTRIBUTE_TYPE;

  @Field(() => [String])
  values: string[];
}
