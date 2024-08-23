import {
  IsArray,
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

  @IsArray()
  @IsOptional()
  @ValidateNested()
  urls: CreateUrlDto[];
}
