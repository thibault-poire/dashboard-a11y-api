import { IsMongoId } from 'class-validator';

export class GetParamsDto {
  @IsMongoId()
  collection_id: string;
}
