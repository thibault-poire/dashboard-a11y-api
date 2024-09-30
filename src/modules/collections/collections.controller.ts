import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { CollectionsService } from './collections.service';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { CreateBodyDto } from './dto/create-body.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';
import { GetParamsDto } from './dto/get-params.dto';
import { GetQueryparamsDto } from './dto/get-queryparams.dto';

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

  @Get(':collection_id')
  get_collection(
    @Param() params: GetParamsDto,
    @Query() queryparams: GetQueryparamsDto,
  ) {
    return this.collections_service.get_one(params, queryparams);
  }

  @Get()
  get_collections(@Query() queryparams: GetQueryparamsDto) {
    return this.collections_service.get_many(queryparams);
  }
}
