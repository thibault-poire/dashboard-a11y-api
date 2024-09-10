import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class OperatorsDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  $in: string[];
}
