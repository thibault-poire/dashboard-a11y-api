import { Module } from '@nestjs/common';

import { UrlsModule } from '../urls/urls.module';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';

import { AuditService } from './audit.service';

@Module({
  exports: [AuditService],

  imports: [PuppeteerModule, UrlsModule],

  providers: [AuditService],
})
export class AuditModule {}
