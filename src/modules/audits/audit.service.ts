import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { CollectionsService } from '../collections/collections.service';

@Injectable()
export class AuditService {
  private logger = new Logger(AuditService.name);

  constructor(
    private readonly event_emitter: EventEmitter2,
    private readonly collection_service: CollectionsService,
    private readonly puppeteer_service: PuppeteerService,
  ) {}

  async collection_audit(collection_id: string) {
    const abort_controller = new AbortController();
    const signal = abort_controller.signal;
    const collection =
      await this.collection_service.get_collection(collection_id);

    if (collection.urls?.length) {
      const timer_start = performance.now();

      this.puppeteer_service
        .create_axe_audit(collection.urls, signal)
        .then((audit) => {
          const timer_end = performance.now();

          this.logger.log(
            `Audit for collection "${collection_id}" completed in ${((timer_end - timer_start) / 1000).toFixed(1)}s`,
          );

          this.event_emitter.emit('audit.completed', audit, collection);
        });

      return;
    }

    throw new UnprocessableEntityException();
  }
}
