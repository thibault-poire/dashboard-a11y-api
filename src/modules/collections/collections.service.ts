import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { CreateCollectionDto } from './dto/create-collection-dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
  ) {}

  async create_collection(collection: CreateCollectionDto) {
    return await this.collection_model.create(collection);
  }

  async delete_collection(collection_id: string) {
    const collection =
      await this.collection_model.findByIdAndDelete(collection_id);

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async get_collection(collection_id: string) {
    const collection = await this.collection_model.findById(collection_id);

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async get_collections() {
    const collections = await this.collection_model
      .find()
      .populate('urls.reports');

    if (collections?.length) {
      return collections;
    }

    throw new NotFoundException();
  }

  async update_collection(collection_id: string, updates: UpdateCollectionDto) {
    const collection = await this.collection_model.findByIdAndUpdate(
      collection_id,
      updates,
      {
        new: true,
      },
    );

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }
}
