import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { UrlDocument } from './url.schema';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Collection {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Url' }])
  urls: UrlDocument[];
}

export const collection_schema = SchemaFactory.createForClass(Collection);
