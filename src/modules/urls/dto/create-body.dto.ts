import { IsUrl } from 'class-validator';

export class CreateBodyDto {
  @IsUrl()
  url: string;
}
