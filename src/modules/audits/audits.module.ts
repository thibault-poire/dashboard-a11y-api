import { Module } from '@nestjs/common';

import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { UrlsModule } from '../urls/urls.module';

import { AudtisController } from './audits.controller';

import { AuditsService } from './audits.service';

@Module({
  controllers: [AudtisController],

  imports: [PuppeteerModule, UrlsModule],

  providers: [AuditsService],
})
export class AuditsModule {}
