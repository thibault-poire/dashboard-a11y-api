import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { url_schema, UrlDocument } from './url.schema';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Collection {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [url_schema] })
  urls: UrlDocument[];
}

export const collection_schema = SchemaFactory.createForClass(Collection);
