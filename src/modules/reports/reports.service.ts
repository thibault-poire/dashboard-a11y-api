import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';

import { AuditService } from 'src/modules/audits/audit.service';

import { Report } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class ReportsService {
  constructor(
    private readonly event_emitter: EventEmitter2,
    @InjectModel(Report.name) private readonly report_model: Model<Report>,
    private readonly audit_service: AuditService,
  ) {}

  async delete_report(report_id: string) {
    const report = await this.report_model.findByIdAndDelete(report_id);

    if (report) {
      this.event_emitter.emit('report.deleted', report_id);

      return report;
    }

    throw new NotFoundException();
  }

  async get_report(report_id: string) {
    const report = await this.report_model.findById(report_id);

    if (report) {
      return report;
    }

    throw new NotFoundException();
  }

  async get_reports() {
    const reports = await this.report_model.find();

    if (reports?.length) {
      return reports;
    }

    throw new NotFoundException();
  }

  async start_audit(collection_id: string) {
    return await this.audit_service.collection_audit(collection_id);
  }
}
