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

import { GetQueryparamsDto as ReportsGetQueryparamsDto } from 'src/modules/reports/dto/get-queryparams.dto';

enum SelectEnum {
  '-_id' = '-_id',
  '-created_at' = '-created_at',
  '-url' = '-url',
  '-reports' = '-reports',
  '-updated_at' = '-updated_at',
  _id = '_id',
  created_at = 'created_at',
  reports = 'reports',
  updated_at = 'updated_at',
  url = 'url',
}

class GetQueryparamsPopulateDto {
  @ValidateIf((_, value) => value)
  @Type(() => ReportsGetQueryparamsDto)
  @ValidateNested()
  reports: ReportsGetQueryparamsDto[];
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
