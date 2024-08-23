import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportsController } from './reports.controller';

import { AuditModule } from 'src/modules/audits/audit.module';

import { ReportsService } from './reports.service';

import { ReportsListener } from './listeners/reports.listener';

import { Report, report_schema } from 'src/mongoose/schemas/report.schema';

@Module({
  controllers: [ReportsController],

  exports: [ReportsService],

  imports: [
    AuditModule,
    MongooseModule.forFeature([{ name: Report.name, schema: report_schema }]),
  ],

  providers: [ReportsService, ReportsListener],
})
export class ReportsModule {}
