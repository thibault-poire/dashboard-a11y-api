import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateBodyDto as UrlCreateBodyDto } from 'src/modules/urls/dto/create-body.dto';
export class CreateBodyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UrlCreateBodyDto)
  urls: UrlCreateBodyDto[];
}
