import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { GetQueryparamsDto as UrlsGetQueryparamsDto } from 'src/modules/urls/dto/get-queryparams.dto';

enum SelectEnum {
  '-_id' = '-_id',
  '-created_at' = '-created_at',
  '-name' = '-name',
  '-updated_at' = '-updated_at',
  '-urls' = '-urls',
  _id = '_id',
  created_at = 'created_at',
  name = 'name',
  updated_at = 'updated_at',
  urls = 'urls',
}

class GetQueryparamsPopulateDto {
  @ValidateIf((_, value) => value)
  @Type(() => UrlsGetQueryparamsDto)
  @ValidateNested()
  urls: UrlsGetQueryparamsDto[];
}

export class GetQueryparamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => GetQueryparamsPopulateDto)
  @ValidateNested()
  populate: GetQueryparamsPopulateDto;

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
