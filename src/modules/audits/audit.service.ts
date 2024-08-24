import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Types } from 'mongoose';

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
      const timer_start = performance.now();

      this.puppeteer_service
        .create_axe_report(urls, signal)
        .then(async (reports) => {
          this.event_emitter.emit(
            'audits.completed',
            reports.map((report) => ({
              ...report,
              collection_id: new Types.ObjectId(collection_id),
            })),
          );

          const timer_end = performance.now();

          this.logger.log(
            `Audit for collection "${collection_id}" completed in ${(timer_end - timer_start).toFixed()}ms`,
          );
        });

      return;
    }

    throw new UnprocessableEntityException();
  }
}
