import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { FilterService } from 'src/shared/services/filter.service';

import { CreateBodyDto } from './dto/create-body.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';
import { GetQueryparamsDto } from './dto/get-queryparams.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
    private filter_service: FilterService,
  ) {}

  async create_one(body: CreateBodyDto) {
    return await this.collection_model.create(body);
  }

  async get_many(queryparams: GetQueryparamsDto) {
    const filter_options = this.filter_service.get_filters(queryparams);

    return await this.collection_model.find({}, {}, filter_options);
  }

  async delete_one({ collection_id }: DeleteParamsDto) {
    const collection =
      await this.collection_model.findByIdAndDelete(collection_id);

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }
}
