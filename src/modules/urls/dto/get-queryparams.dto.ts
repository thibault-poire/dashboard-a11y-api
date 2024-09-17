import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

enum SelectEnum {
  _id = '_id',
  created_at = 'created_at',
  name = 'name',
  updated_at = 'updated_at',
  urls = 'urls',
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
  select: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  skip: number;

  @IsOptional()
  sort: string;
}
