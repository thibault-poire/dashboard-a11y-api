import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { ReportsService } from '../reports.service';

import { Report } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class ReportsListener {
  private logger = new Logger(ReportsListener.name);

  constructor(
    private readonly event_emitter: EventEmitter2,
    private readonly reports_service: ReportsService,
  ) {}

  @OnEvent('audit.completed')
  async handle_reports_created(event: Report[]) {
    const reports = await this.reports_service.create_many_report(event);

    this.event_emitter.emit(
      'reports.created',
      reports.map(({ _id: report_id, url_id }) => ({ report_id, url_id })),
    );

    this.logger.log('"audit.completed" event completed');
  }
}
