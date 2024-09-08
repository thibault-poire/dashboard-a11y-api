import { IsArray, IsOptional } from 'class-validator';

export class OperatorsDto {
  @IsArray()
  @IsOptional()
  $in: string[];
}
