import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateReportDto } from '../dto/create-report.dto';

import { CollectionDocument } from 'src/mongoose/schemas/collection.schema';
import { Report } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class ReportsListener {
  private logger = new Logger(ReportsListener.name);

  constructor(
    private readonly event_emitter: EventEmitter2,
    @InjectModel(Report.name) private readonly report_model: Model<Report>,
  ) {}

  @OnEvent('audit.completed')
  async handle_audit_completed(
    audit: CreateReportDto[],
    collection: CollectionDocument,
  ) {
    const reports = await this.report_model.insertMany(audit);

    this.event_emitter.emit('reports.created', reports, collection);

    this.logger.log('"audit.completed" event completed');
  }

  @OnEvent('collection_urls.deleted')
  async handle_collection_urls_deleted(collection: CollectionDocument) {
    const report_ids = collection.urls?.reduce((previous, { reports }) => {
      reports?.map((report_id) => {
        previous.add(report_id._id);
      });

      return previous;
    }, new Set<Types.ObjectId>());

    await this.report_model.deleteMany({
      _id: { $in: [...report_ids] },
    });

    this.logger.log('"collection.deleted" event completed');
  }
}
