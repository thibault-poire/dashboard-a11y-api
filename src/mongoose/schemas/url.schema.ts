import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { ReportDocument } from './report.schema';

export type UrlDocument = HydratedDocument<Url>;

@Schema({
  _id: false,
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Url {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  })
  reports: ReportDocument[];

  @Prop({ required: true })
  url: string;
}

export const url_schema = SchemaFactory.createForClass(Url);
