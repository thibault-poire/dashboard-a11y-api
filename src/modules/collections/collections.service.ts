import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { CreateBodyDto } from './dto/create-body.dto';
import { DeleteParamsDto } from './dto/delete-params.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
  ) {}

  async create_one(body: CreateBodyDto) {
    return await this.collection_model.create(body);
  }

  async get_many() {
    return await this.collection_model.find();
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
