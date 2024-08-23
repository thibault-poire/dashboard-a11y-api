import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UrlsService } from '../urls/urls.service';
import { PuppeteerService } from '../puppeteer/puppeteer.service';

@Injectable()
export class AuditService {
  private logger = new Logger(AuditService.name);

  constructor(
    private readonly event_emitter: EventEmitter2,
    private readonly urls_service: UrlsService,
    private readonly puppeteer_service: PuppeteerService,
  ) {}

  async collection_audit(collection_id: string) {
    const abort_controller = new AbortController();
    const signal = abort_controller.signal;
    const urls = await this.urls_service.get_collection_urls(collection_id);

    if (urls?.length) {
      this.puppeteer_service
        .create_axe_report(urls, signal)
        .then(async (reports) => {
          this.event_emitter.emit(
            'audit.completed',
            reports.map((report) => ({ ...report, collection_id })),
          );
        });

      this.logger.log(`Audit for collection "${collection_id}" is completed`);

      return;
    }

    throw new UnprocessableEntityException();
  }
}
