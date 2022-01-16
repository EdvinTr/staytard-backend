import { Field, InputType } from '@nestjs/graphql';

/* export enum ATTRIBUTE_TYPE {
  SIZE = 'Size',
  COLOR = 'Color',
}
registerEnumType(ATTRIBUTE_TYPE, {
  name: 'AttributeType',
  description: 'The basic attributes of products',
}); */

/* export class  ProductAttributeInput {
  size: {value: string};
  color: {value: string};
  quantity: number;
  sku: string;
} */

@InputType()
class AttributeValueType {
  @Field()
  value: string;
}

@InputType()
export class CreateProductAttributeInput {
  @Field(() => AttributeValueType)
  size: AttributeValueType;

  @Field(() => AttributeValueType)
  color: AttributeValueType;

  @Field()
  quantity: number;

  @Field()
  sku: string;
}
