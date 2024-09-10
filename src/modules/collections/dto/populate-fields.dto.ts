import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class PopulateFieldsDto {
  @IsOptional()
  @IsArray()
  fields: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip: number;
}
