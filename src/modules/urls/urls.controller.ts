import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';

import { UrlsService } from './urls.service';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { CreateBodyDto } from './dto/create-body.dto';
import { CreateParamsDto } from './dto/create-params.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';
import { GetParamsDto } from './dto/get-params.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class UrlsController {
  constructor(private urls_service: UrlsService) {}

  @Post()
  @HttpCode(201)
  create_url(@Param() params: CreateParamsDto, @Body() url: CreateBodyDto) {
    return this.urls_service.create_one(params, url);
  }

  @Delete(':url_id')
  @HttpCode(204)
  delete_url(@Param() params: DeleteParamsDto) {
    return this.urls_service.delete_one(params);
  }

  @Get()
  get_urls(@Param() params: GetParamsDto) {
    return this.urls_service.get_many(params);
  }
}
