import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { CreateCollectionBodyDto } from './dto/create-collection-body.dto';
import { QueryCollectionsDto } from './dto/query-collections.dto';
import { UpdateCollectionBodyDto } from './dto/update-collection-body.dto';
import { create_populate_options } from 'src/shared/helpers/create-populate-options';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly event_emitter: EventEmitter2,
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
  ) {}

  async create_collection(collection: CreateCollectionBodyDto) {
    return await this.collection_model.create(collection);
  }

  async delete_collection(collection_id: string) {
    const collection =
      await this.collection_model.findByIdAndDelete(collection_id);

    if (collection) {
      this.event_emitter.emit('collection_urls.deleted', collection);

      return collection;
    }

    throw new NotFoundException();
  }

  async get_collection(collection_id: string, query?: QueryCollectionsDto) {
    const populate_options = create_populate_options(
      'urls.reports',
      query.populate,
    );

    const collection = await this.collection_model
      .findById(collection_id)
      .populate(populate_options);

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async get_collections(query?: QueryCollectionsDto) {
    const populate_options = create_populate_options(
      'urls.reports',
      query.populate,
    );

    const collections = await this.collection_model
      .find()
      .populate(populate_options);

    if (collections?.length) {
      return collections;
    }

    throw new NotFoundException();
  }

  async update_collection(
    collection_id: string,
    updates: UpdateCollectionBodyDto,
  ) {
    const collection = await this.collection_model.findByIdAndUpdate(
      collection_id,
      updates,
    );

    if (collection) {
      if (updates?.urls) {
        this.event_emitter.emit('collection_urls.deleted', collection);
      }

      return await this.get_collection(collection_id);
    }

    throw new NotFoundException();
  }
}
