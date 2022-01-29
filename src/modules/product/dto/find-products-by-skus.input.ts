import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class FindProductsBySkusInput {
  @Field(() => [String])
  @IsString({ each: true })
  @ArrayNotEmpty()
  skus: string[];

  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(50)
  limit: number;
}
