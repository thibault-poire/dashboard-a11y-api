import { Controller, Get, Param, UseFilters } from '@nestjs/common';

import { ReportsService } from './reports.service';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';
import { GetParamsDto } from './dto/get-params.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class ReportsController {
  constructor(private reports_service: ReportsService) {}

  @Get()
  get_reports(@Param() params: GetParamsDto) {
    return this.reports_service.get_many(params);
  }
}
