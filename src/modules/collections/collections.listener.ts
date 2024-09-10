import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Collection,
  CollectionDocument,
} from 'src/mongoose/schemas/collection.schema';
import { ReportDocument } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class CollectionsListener {
  private logger = new Logger(CollectionsListener.name);

  constructor(
    @InjectModel(Collection.name)
    private readonly collection_model: Model<Collection>,
  ) {}

  @OnEvent('reports.created')
  async handle_reports_created(
    reports: ReportDocument[],
    collection: CollectionDocument,
  ) {
    console.log('test');

    await this.collection_model.findByIdAndUpdate(collection._id, {
      $push: collection.urls.reduce((previous, _, index) => {
        return { ...previous, [`urls.${index}.reports`]: reports[index]._id };
      }, {}),
    });

    this.logger.log('"reports.created" event completed');
  }

  @OnEvent('report.deleted')
  async handle_report_deleted() {}
}
