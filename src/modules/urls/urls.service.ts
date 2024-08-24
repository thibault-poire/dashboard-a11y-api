import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collection_model: Model<Collection>,
    private readonly event_emitter: EventEmitter2,
  ) {}

  async create_collection_url(collection_id: string, url: CreateUrlDto) {
    const collection = await this.collection_model.findByIdAndUpdate(
      collection_id,
      { $push: { urls: url } },
      { new: true },
    );

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async delete_collection_url(collection_id: string, url_id: string) {
    const collection = await this.collection_model.findOneAndUpdate(
      { _id: collection_id, 'urls._id': url_id },
      { $pull: { urls: { _id: url_id } } },
      { new: true },
    );

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }

  async get_collection_url(collection_id: string, url_id: string) {
    const collection = await this.collection_model.findOne(
      { _id: collection_id, 'urls._id': url_id },
      { 'urls.$': 1 },
    );

    if (collection?.urls?.length) {
      return collection.urls[0];
    }

    throw new NotFoundException();
  }

  async get_collection_urls(collection_id: string) {
    const collection = await this.collection_model.findById(collection_id);

    if (collection?.urls?.length) {
      return collection.urls;
    }

    throw new NotFoundException();
  }

  async replace_collection_urls(collection_id: string, urls: CreateUrlDto[]) {
    const collection = await this.collection_model.findByIdAndUpdate(
      collection_id,
      { $set: { urls: urls } },
      { new: true },
    );

    if (collection?.urls?.length) {
      this.event_emitter.emit('collection_urls.deleted', collection_id);

      return collection.urls;
    }

    throw new NotFoundException();
  }

  async update_collection_url(
    collection_id: string,
    url_id: string,
    updates: UpdateUrlDto,
  ) {
    const formatted_updates = Object.keys(updates).reduce((previous, key) => {
      return { ...previous, [`urls.$.${key}`]: updates[key] };
    }, {});

    const collection = await this.collection_model.findOneAndUpdate(
      { _id: collection_id, 'urls._id': url_id },
      { $set: formatted_updates },
      { new: true },
    );

    if (collection) {
      return collection;
    }

    throw new NotFoundException();
  }
}
