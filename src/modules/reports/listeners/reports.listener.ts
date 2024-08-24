import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateReportDto } from '../dto/create-report.dto';

import { Report } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class ReportsListener {
  private logger = new Logger(ReportsListener.name);

  constructor(
    private readonly event_emitter: EventEmitter2,
    @InjectModel(Report.name) private readonly report_model: Model<Report>,
  ) {}

  @OnEvent('audits.completed')
  async handle_audits_completed(reports: CreateReportDto[]) {
    await this.report_model.insertMany(reports);

    this.event_emitter.emit('reports.created', reports);

    this.logger.log('"audit.completed" event completed');
  }

  @OnEvent('collection_urls.deleted')
  async handle_collection_urls_deleted(collection_id: string) {
    await this.report_model.deleteMany({
      collection_id: collection_id,
    });

    this.logger.log('"collection.deleted" event completed');
  }
}
