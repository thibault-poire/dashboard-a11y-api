import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportsController } from './reports.controller';

import { ReportsService } from './reports.service';

import {
  Collection,
  collection_schema,
} from 'src/mongoose/schemas/collection.schema';
import { Report, report_schema } from 'src/mongoose/schemas/report.schema';
import { Url, url_schema } from 'src/mongoose/schemas/url.schema';

@Module({
  controllers: [ReportsController],

  exports: [ReportsService],

  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: collection_schema },
      { name: Report.name, schema: report_schema },
      { name: Url.name, schema: url_schema },
    ]),
  ],

  providers: [ReportsService],
})
export class ReportsModule {}
