import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { CollectionsService } from './collections.service';

import { CreateCollectionBodyDto } from './dto/create-collection-body.dto';
import { QueryCollectionsDto } from './dto/query-collections.dto';
import { UpdateCollectionBodyDto } from './dto/update-collection-body.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class CollectionsController {
  constructor(private readonly collections_service: CollectionsService) {}

  @Get()
  get_collections(@Query() query: QueryCollectionsDto) {
    return this.collections_service.get_collections(query);
  }

  @Post()
  @HttpCode(201)
  create_collection(@Body() collection: CreateCollectionBodyDto) {
    return this.collections_service.create_collection(collection);
  }

  @Get(':id')
  get_collection(
    @Param('id') collection_id: string,
    @Query() query: QueryCollectionsDto,
  ) {
    return this.collections_service.get_collection(collection_id, query);
  }

  @Patch(':id')
  update_collection(
    @Param('id') collection_id: string,
    @Body() updates: UpdateCollectionBodyDto,
  ) {
    return this.collections_service.update_collection(collection_id, updates);
  }

  @Delete(':id')
  @HttpCode(204)
  delete_collection(@Param('id') collection_id: string) {
    return this.collections_service.delete_collection(collection_id);
  }
}
