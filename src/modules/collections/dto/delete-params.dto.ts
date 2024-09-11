import { IsMongoId } from 'class-validator';

export class DeleteParamsDto {
  @IsMongoId()
  collection_id: string;
}
