import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PuppeteerService } from '../puppeteer/puppeteer.service';

import { CreateParamsDto } from './dto/create-params.dto';
import { UrlsService } from '../urls/urls.service';

@Injectable()
export class AuditsService {
  private logger = new Logger(AuditsService.name);

  constructor(
    private puppeteer_service: PuppeteerService,
    private urls_service: UrlsService,
  ) {}

  async create_one(params: CreateParamsDto) {
    const urls = await this.urls_service.get_many(params);

    if (urls.length) {
      const timer_start = performance.now();

      this.puppeteer_service.create_axe_audit(urls).then(() => {
        const timer_end = performance.now();

        this.logger.log(
          `Audit for collection "${params.collection_id}" completed in ${((timer_end - timer_start) / 1000).toFixed(1)}s`,
        );
      });

      return;
    }

    throw new UnprocessableEntityException();
  }
}
