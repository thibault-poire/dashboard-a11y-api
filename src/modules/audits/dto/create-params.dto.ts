import { IsMongoId } from 'class-validator';

export class CreateParamsDto {
  @IsMongoId()
  collection_id: string;
}
