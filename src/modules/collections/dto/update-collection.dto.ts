import { IsArray, IsOptional, IsString } from 'class-validator';

import { UpdateUrlDto } from 'src/modules/urls/dto/update-url.dto';

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  urls: UpdateUrlDto[];
}
