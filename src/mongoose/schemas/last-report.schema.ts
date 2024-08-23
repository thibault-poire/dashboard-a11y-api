import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LastReportDocument = HydratedDocument<LastReport>;

@Schema({
  _id: false,
  strict: 'throw',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class LastReport {
  @Prop()
  total_errors: number;
}

export const last_report_schema = SchemaFactory.createForClass(LastReport);
