import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Report {
  @Prop()
  collection_id: mongoose.Types.ObjectId;

  @Prop({ type: [Array] })
  inapplicable: object[][];

  @Prop({ type: [Array] })
  incomplete: object[][];

  @Prop({ type: [Array] })
  passes: object[][];

  @Prop({ required: true })
  url_id: mongoose.Types.ObjectId;

  @Prop({ type: [Array] })
  violations: object[][];
}

export const report_schema = SchemaFactory.createForClass(Report);
