import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PRODUCT_SORT_BY, SORT_DIRECTION } from '../../../lib/gql-enums';

export class FindProductsDto {
  @Min(1)
  @Transform(({ value }) => +value)
  page: number;

  @Min(1)
  @Max(50)
  @Transform(({ value }) => +value)
  limit: number;

  @Matches(/\//, { message: 'Category path must contain a slash' })
  @Transform(({ value }) => value.toLowerCase())
  categoryPath: string;

  @IsOptional()
  @IsString()
  q: string;

  @IsOptional()
  @IsEnum(PRODUCT_SORT_BY, {
    message: `Sort by can only be one of the following: ${Object.values(
      PRODUCT_SORT_BY,
    ).join(', ')}`,
  })
  sortBy?: PRODUCT_SORT_BY;

  @IsOptional()
  @IsEnum(SORT_DIRECTION, {
    message: `Sort direction can only be one of the following: ${Object.values(
      SORT_DIRECTION,
    ).join(', ')}`,
  })
  sortDirection?: SORT_DIRECTION;
}
