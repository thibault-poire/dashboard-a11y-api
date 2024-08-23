import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Collection } from 'src/mongoose/schemas/collection.schema';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Collection.name) private collection_model: Model<Collection>,
  ) {}

  async create_collection_url(collection_id: string, url: CreateUrlDto) {
    const collection = await this.collection_model.findByIdAndUpdate(
      collection_id,
      {
        $push: { urls: url },
      },
      { new: true, projection: { urls: { $slice: ['$urls', -1] } } },
    );

    if (collection?.urls?.length) {
      return collection.urls[0];
    }

    throw new NotFoundException();
  }

  async delete_collection_url(collection_id: string, url_id: string) {
    const collection = await this.collection_model.findOneAndDelete({
      _id: collection_id,
      'urls._id': url_id,
    });

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
      { new: true, projection: { urls } },
    );

    if (collection?.urls?.length) {
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
      {
        _id: collection_id,
        'urls._id': url_id,
      },
      { $set: formatted_updates },
      { new: true, projection: { urls: { $elemMatch: { _id: url_id } } } },
    );

    if (collection?.urls?.length) {
      return collection.urls[0];
    }

    throw new NotFoundException();
  }

  async update_url_report_reference(url_id: string, report_id: string) {
    return this.collection_model.findOneAndUpdate(
      { 'urls._id': url_id },
      { $push: { 'urls.$.reports': report_id } },
      {
        new: true,
        projection: { urls: { $elemMatch: { 'reports._id': report_id } } },
      },
    );
  }
}
