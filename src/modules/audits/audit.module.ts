import { Module } from '@nestjs/common';

import { CollectionsModule } from '../collections/collections.module';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';

import { AuditService } from './audit.service';

@Module({
  exports: [AuditService],

  imports: [PuppeteerModule, CollectionsModule],

  providers: [AuditService],
})
export class AuditModule {}
