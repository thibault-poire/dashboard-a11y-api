import { IsArray, IsOptional, IsString } from 'class-validator';

import { UpdateUrlDto } from './update-url.dto';

export class UpdateCollectionBodyDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  urls: UpdateUrlDto[];
}
