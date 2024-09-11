import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CollectionsController } from './collections.controller';

import { CollectionsService } from './collections.service';

import {
  Collection,
  collection_schema,
} from 'src/mongoose/schemas/collection.schema';

@Module({
  controllers: [CollectionsController],

  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: collection_schema },
    ]),
  ],

  providers: [CollectionsService],
})
export class CollectionsModule {}
