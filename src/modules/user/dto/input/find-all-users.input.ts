import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import { SORT_DIRECTION, USER_SORT_BY } from '../../../../lib/gql-enums';

@InputType()
export class FindAllUsersInput {
  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(50)
  limit: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  q?: string;

  @Field(() => USER_SORT_BY, { nullable: true })
  @IsOptional()
  @IsEnum(USER_SORT_BY, {
    message: `Sort by can only be one of the following: ${Object.values(
      USER_SORT_BY,
    ).join(', ')}`,
  })
  sortBy?: USER_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  @IsOptional()
  @IsEnum(SORT_DIRECTION, {
    message: `Sort direction can only be one of the following: ${Object.values(
      SORT_DIRECTION,
    ).join(', ')}`,
  })
  sortDirection?: SORT_DIRECTION;
}
