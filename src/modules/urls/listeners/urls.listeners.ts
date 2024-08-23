import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UrlsService } from '../urls.service';

@Injectable()
export class UrlsListener {
  private logger = new Logger(UrlsListener.name);

  constructor(private readonly urls_services: UrlsService) {}

  @OnEvent('reports.created')
  async handle_reports_created(event: { report_id: string; url_id: string }[]) {
    for (let index = 0; index < event.length; index++) {
      const { report_id, url_id } = event[index];

      await this.urls_services.update_url_report_reference(url_id, report_id);
    }

    this.logger.log('"reports.created" event completed');
  }
}
