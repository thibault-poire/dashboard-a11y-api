import { IsOptional, ValidateNested } from 'class-validator';
import { OperatorsDto } from './operators.dto';
import { Type } from 'class-transformer';

export class FiltersDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => OperatorsDto)
  _id: OperatorsDto;
}
