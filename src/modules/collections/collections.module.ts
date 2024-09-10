import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CollectionsController } from './collections.controller';

import { CollectionsService } from './collections.service';

import {
  Collection,
  collection_schema,
} from 'src/mongoose/schemas/collection.schema';
import { CollectionsListener } from './collections.listener';

@Module({
  controllers: [CollectionsController],

  exports: [CollectionsService],

  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: collection_schema },
    ]),
  ],

  providers: [CollectionsListener, CollectionsService],
})
export class CollectionsModule {}
