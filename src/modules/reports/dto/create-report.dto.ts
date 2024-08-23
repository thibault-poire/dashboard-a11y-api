import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateReportDto {
  @IsOptional()
  collection_id: mongoose.Types.ObjectId;

  @IsArray()
  inapplicable: object[][];

  @IsArray()
  incomplete: object[][];

  @IsArray()
  passes: object[][];

  @IsString()
  @IsNotEmpty()
  url_id: mongoose.Types.ObjectId;

  @IsArray()
  violations: object[][];
}
