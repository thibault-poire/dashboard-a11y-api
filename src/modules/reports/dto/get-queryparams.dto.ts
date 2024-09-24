import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

enum SelectEnum {
  '-_id' = '-_id',
  '-created_at' = '-created_at',
  '-inapplicable' = '-inapplicable',
  '-incomplete' = '-incomplete',
  '-updated_at' = '-updated_at',
  '-passes' = '-passes',
  '-violations' = '-violations',
  _id = '_id',
  created_at = 'created_at',
  updated_at = 'updated_at',
  inapplicable = 'inapplicable',
  incomplete = 'incomplete',
  passes = 'passes',
  violations = 'violations',
}

export class GetQueryparamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsArray()
  @IsEnum(SelectEnum, { each: true })
  select: SelectEnum[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  skip: number;

  @IsOptional()
  @IsEnum(SelectEnum)
  sort: SelectEnum;
}
