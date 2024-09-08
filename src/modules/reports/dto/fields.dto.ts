import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class FieldsDto {
  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  _id: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  collection_id: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  inapplicable: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'inapplicable.id': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'inapplicable.tags': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'inapplicable.description': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'inapplicable.nodes': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  incomplete: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'incomplete.id': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'incomplete.impact': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'incomplete.tags': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'incomplete.description': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'incomplete.nodes': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  passes: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'passes.id': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'passes.tags': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'passes.description': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'passes.nodes': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  url_id: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  violations: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'violations.id': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'violations.impact': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'violations.tags': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'violations.description': string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 0])
  'violations.nodes': string;
}
