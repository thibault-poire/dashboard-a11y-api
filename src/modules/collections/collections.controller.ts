import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { CollectionsService } from './collections.service';

import { CreateCollectionDto } from './dto/create-collection-dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class CollectionsController {
  constructor(private readonly collections_service: CollectionsService) {}

  @Get()
  get_collections() {
    return this.collections_service.get_collections();
  }

  @Post()
  @HttpCode(201)
  create_collection(@Body() collection: CreateCollectionDto) {
    return this.collections_service.create_collection(collection);
  }

  @Get(':id')
  get_collection(@Param('id') collection_id: string) {
    return this.collections_service.get_collection(collection_id);
  }

  @Patch(':id')
  update_collection(
    @Param('id') collection_id: string,
    @Body() updates: UpdateCollectionDto,
  ) {
    return this.collections_service.update_collection(collection_id, updates);
  }

  @Delete(':id')
  @HttpCode(204)
  delete_collection(@Param('id') collection_id: string) {
    return this.collections_service.delete_collection(collection_id);
  }
}
