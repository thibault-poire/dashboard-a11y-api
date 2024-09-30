import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';
import { Report } from 'src/mongoose/schemas/report.schema';
import { Url } from 'src/mongoose/schemas/url.schema';

import { FilterService } from 'src/shared/services/filter.service';

import { CreateBodyDto } from './dto/create-body.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';
import { GetQueryparamsDto } from './dto/get-queryparams.dto';
import { GetParamsDto } from './dto/get-params.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
    @InjectModel(Report.name) private report_model: Model<Report>,
    @InjectModel(Url.name) private url_model: Model<Url>,
    private filter_service: FilterService,
  ) {}

  async create_one(body: CreateBodyDto) {
    if (body.urls?.length) {
      const urls = await this.url_model.create(body.urls);

      const collection = await this.collection_model.create({
        ...body,
        urls: urls.map(({ _id }) => _id),
      });

      return await this.collection_model.findById(
        collection.id,
        {},
        { populate: 'urls' },
      );
    }

    return await this.collection_model.create(body);
  }

  async get_many(queryparams: GetQueryparamsDto) {
    const filter_options = this.filter_service.get_filters(queryparams);

    const collections = await this.collection_model.find(
      {},
      {},
      filter_options,
    );

    if (collections?.length) {
      return collections;
    }

    throw new NotFoundException();
  }

  async get_one(
    { collection_id }: GetParamsDto,
    queryparams: GetQueryparamsDto,
  ) {
    const filter_options = this.filter_service.get_filters(queryparams);

    const collection = await this.collection_model.findById(
      collection_id,
      {},
      filter_options,
    );

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async delete_one({ collection_id }: DeleteParamsDto) {
    const collection = await this.collection_model.findByIdAndDelete(
      collection_id,
      { populate: 'urls' },
    );

    if (collection) {
      if (collection.urls?.length) {
        await this.url_model.deleteMany({
          _id: { $in: collection.urls.map(({ _id }) => _id) },
        });

        const reports = collection.urls.reduce((previous, current) => {
          if (current.reports?.length) {
            return [...previous, ...current.reports];
          }

          return previous;
        }, []);

        if (reports?.length) {
          await this.report_model.deleteMany({ _id: { $in: reports } });
        }
      }

      return collection;
    }

    throw new NotFoundException();
  }
}
