import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';
import { Report } from 'src/mongoose/schemas/report.schema';
import { Url } from 'src/mongoose/schemas/url.schema';

import { CreateBodyDto } from './dto/create-body.dto';
import { CreateParamsDto } from './dto/create-params.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';
import { GetParamsDto } from './dto/get-params.dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
    @InjectModel(Report.name) private report_model: Model<Report>,
    @InjectModel(Url.name) private url_model: Model<Url>,
  ) {}

  async get_many({ collection_id }: GetParamsDto) {
    const collection = await this.collection_model.findById(
      collection_id,
      {
        urls: 1,
        _id: 0,
      },
      { populate: 'urls' },
    );

    if (collection.urls.length) {
      return collection.urls;
    }

    throw new NotFoundException();
  }

  async delete_one({ collection_id, url_id }: DeleteParamsDto) {
    const url = await this.url_model.findByIdAndDelete(url_id);

    if (url) {
      await this.collection_model.findByIdAndUpdate(collection_id, {
        $pull: { urls: url._id },
      });

      if (url.reports?.length) {
        await this.report_model.deleteMany({ _id: { $in: url.reports } });
      }

      return url;
    }

    throw new NotFoundException();
  }

  async create_one({ collection_id }: CreateParamsDto, body: CreateBodyDto) {
    const url = await this.url_model.create(body);

    if (url) {
      await this.collection_model.findByIdAndUpdate(collection_id, {
        $push: { urls: url._id },
      });

      return url;
    }
  }
}
