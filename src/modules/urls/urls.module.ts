import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlsController } from './urls.controller';

import { UrlsService } from './urls.service';

import { UrlsListener } from './listeners/urls.listeners';

import {
  Collection,
  collection_schema,
} from 'src/mongoose/schemas/collection.schema';

@Module({
  controllers: [UrlsController],

  exports: [UrlsService],

  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: collection_schema },
    ]),
  ],

  providers: [UrlsService, UrlsListener],
})
export class UrlsModule {}
