import { IsMongoId } from 'class-validator';

import { GetParamsDto as UrlsGetParamsDto } from '../../urls/dto/get-params.dto';

export class GetParamsDto extends UrlsGetParamsDto {
  @IsMongoId()
  url_id: string;
}
