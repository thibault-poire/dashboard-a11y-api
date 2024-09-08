import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateUrlDto } from 'src/modules/urls/dto/create-url.dto';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateUrlDto)
  urls: CreateUrlDto[];
}
