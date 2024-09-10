import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateUrlDto } from './create-url.dto';

export class CreateCollectionBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateUrlDto)
  urls: CreateUrlDto[];
}
