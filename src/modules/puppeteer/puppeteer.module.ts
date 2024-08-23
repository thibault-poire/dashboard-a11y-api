import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Module({
  exports: [PuppeteerService],

  providers: [PuppeteerService],
})
export class PuppeteerModule {}
