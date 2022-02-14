import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BasicCategory {
  @Field()
  id: number;

  @Field()
  name: string;
}
