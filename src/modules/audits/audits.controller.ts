import { Controller, HttpCode, Param, Post } from '@nestjs/common';

import { AuditsService } from './audits.service';

import { CreateParamsDto } from './dto/create-params.dto';

@Controller()
export class AudtisController {
  constructor(private audits_service: AuditsService) {}

  @Post()
  @HttpCode(204)
  create_audit(@Param() params: CreateParamsDto) {
    this.audits_service.create_one(params);
  }
}
