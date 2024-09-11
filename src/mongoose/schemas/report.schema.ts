import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Report {
  @Prop({ type: [Array] })
  inapplicable: object[][];

  @Prop({ type: [Array] })
  incomplete: object[][];

  @Prop({ type: [Array] })
  passes: object[][];

  @Prop({ type: [Array] })
  violations: object[][];
}

export const report_schema = SchemaFactory.createForClass(Report);
