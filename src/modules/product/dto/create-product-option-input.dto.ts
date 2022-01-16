import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum OPTION_TYPE {
  SIZE = 'Size',
  COLOR = 'Color',
}
registerEnumType(OPTION_TYPE, {
  name: 'OptionType',
  description: 'The basic types of products',
});

@InputType()
export class CreateProductOptionInput {
  @Field(() => OPTION_TYPE)
  optionName: OPTION_TYPE;

  @Field(() => [String])
  optionValues: string[];
}
