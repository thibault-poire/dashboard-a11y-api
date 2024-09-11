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

import { CollectionsService } from './collections.service';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { DeleteParamsDto } from './dto/delete-params.dto';
import { CreateBodyDto } from './dto/create-body.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class CollectionsController {
  constructor(private collections_service: CollectionsService) {}

  @Post()
  @HttpCode(201)
  create_collection(@Body() collection: CreateBodyDto) {
    return this.collections_service.create_one(collection);
  }

  @Delete(':collection_id')
  @HttpCode(204)
  delete_collection(@Param() params: DeleteParamsDto) {
    return this.collections_service.delete_one(params);
  }

  @Get()
  get_collections() {
    return this.collections_service.get_many();
  }
}
