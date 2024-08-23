import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly app_service: AppService) {}

  @Get()
  healthcheck() {
    return this.app_service.get_healthcheck();
  }
}
