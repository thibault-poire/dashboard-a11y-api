import { IsString } from 'class-validator';

export class CreateBodyDto {
  @IsString()
  name: string;
}
