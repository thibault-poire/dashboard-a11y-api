import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditService } from 'src/modules/audits/audit.service';

import { Report } from 'src/mongoose/schemas/report.schema';

import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private report_model: Model<Report>,

    @Inject(forwardRef(() => AuditService))
    private readonly audit_service: AuditService,
  ) {}

  async create_many_report(reports: CreateReportDto[]) {
    return await this.report_model.insertMany(reports);
  }

  async delete_report(report_id: string) {
    const report = this.report_model.findByIdAndDelete(report_id);

    if (report) {
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
