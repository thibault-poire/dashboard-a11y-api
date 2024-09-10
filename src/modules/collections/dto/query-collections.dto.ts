import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PopulateFieldsDto } from './populate-fields.dto';

export class QueryCollectionsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PopulateFieldsDto)
  populate: PopulateFieldsDto;
}
