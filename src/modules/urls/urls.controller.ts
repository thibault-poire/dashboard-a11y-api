import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { UrlsService } from './urls.service';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class UrlsController {
  constructor(private readonly urls_service: UrlsService) {}

  @Get()
  get_collection_urls(@Param('collection_id') collection_id: string) {
    return this.urls_service.get_collection_urls(collection_id);
  }

  @Post()
  create_collection_url(
    @Param('collection_id') collection_id: string,
    @Body() url: CreateUrlDto,
  ) {
    return this.urls_service.create_collection_url(collection_id, url);
  }

  @Put()
  @HttpCode(201)
  replace_collection_urls(
    @Param('collection_id') collection_id: string,
    urls: CreateUrlDto[],
  ) {
    return this.urls_service.replace_collection_urls(collection_id, urls);
  }

  @Get(':url_id')
  get_collection_url(
    @Param('collection_id') collection_id: string,
    @Param('url_id') url_id: string,
  ) {
    return this.urls_service.get_collection_url(collection_id, url_id);
  }

  @Patch(':url_id')
  update_collection_url(
    @Param('collection_id') collection_id: string,
    @Param('url_id') url_id: string,
    @Body() updates: UpdateUrlDto,
  ) {
    return this.urls_service.update_collection_url(
      collection_id,
      url_id,
      updates,
    );
  }

  @Delete()
  @HttpCode(204)
  delete_collection_url(
    @Param('collection_id') collection_id: string,
    @Param('url_id') url_id: string,
  ) {
    return this.urls_service.delete_collection_url(collection_id, url_id);
  }
}
