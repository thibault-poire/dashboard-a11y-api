import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';
import { ReportDocument } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class UrlsListener {
  private logger = new Logger(UrlsListener.name);

  constructor(
    @InjectModel(Collection.name)
    private readonly collection_model: Model<Collection>,
  ) {}

  @OnEvent('reports.created')
  async handle_reports_created(reports: ReportDocument[]) {
    let total_errors = 0;

    for (let index = 0; index < reports.length; index++) {
      const { _id, url_id, violations } = reports[index];

      total_errors += violations.length;

      await this.collection_model.findOneAndUpdate(
        { 'urls._id': url_id },
        { $push: { 'urls.$.reports': _id } },
        { new: true },
      );
    }

    const [{ collection_id }] = reports;

    await this.collection_model.findByIdAndUpdate(collection_id, {
      $set: { 'last_report.total_errors': total_errors },
    });

    this.logger.log('"reports.created" event completed');
  }

  @OnEvent('report.deleted')
  async handle_report_deleted({
    url_id,
    report_id,
  }: {
    url_id: string;
    report_id: string;
  }) {
    this.collection_model.findOneAndUpdate(
      { 'urls._id': url_id },
      { $pull: { 'urls.$.reports': report_id } },
    );

    this.logger.log('"report.deleted" event completed');
  }
}
