import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PuppeteerService } from './puppeteer.service';

import { Report, report_schema } from 'src/mongoose/schemas/report.schema';
import { Url, url_schema } from 'src/mongoose/schemas/url.schema';
@Module({
  exports: [PuppeteerService],

  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: report_schema },
      { name: Url.name, schema: url_schema },
    ]),
  ],

  providers: [PuppeteerService],
})
export class PuppeteerModule {}
