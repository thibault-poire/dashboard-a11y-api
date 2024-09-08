import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { MongooseExceptionFilter } from 'src/shared/filters/mongoose-exception.filter';

import { ReportsService } from './reports.service';

import { FieldsDto } from './dto/fields.dto';
import { FiltersDto } from 'src/shared/dto/filters.dto';

@Controller()
@UseFilters(MongooseExceptionFilter)
export class ReportsController {
  constructor(private readonly reports_service: ReportsService) {}

  @Get()
  get_reports(
    @Query('filters') filters: FiltersDto,
    @Query('fields') fields: FieldsDto,
  ) {
    return this.reports_service.get_reports(filters, fields);
  }

  @Post()
  @HttpCode(204)
  start_audit(@Query('collection_id') collection_id: string) {
    return this.reports_service.start_audit(collection_id);
  }

  @Get(':report_id')
  get_report(@Param('report_id') report_id: string) {
    return this.reports_service.get_report(report_id);
  }

  @Delete(':report_id')
  @HttpCode(204)
  delete_report(@Param('report_id') report_id: string) {
    this.reports_service.delete_report(report_id);
  }
}
