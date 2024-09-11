import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Report, ReportDocument } from 'src/mongoose/schemas/report.schema';
import { Url } from 'src/mongoose/schemas/url.schema';

import { GetParamsDto } from './dto/get-params.dto';
@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private report_model: Model<ReportDocument>,
    @InjectModel(Url.name) private url_model: Model<Url>,
  ) {}
  async get_many({ url_id }: GetParamsDto) {
    const url = await this.url_model.findById(
      url_id,
      { _id: 0, reports: 1 },
      { populate: 'reports' },
    );

    if (url.reports?.length) {
      return url.reports;
    }

    throw new NotFoundException();
  }
}
