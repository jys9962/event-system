import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RewardPayload = Record<string, any>;

export type EventRewardDocument = HydratedDocument<EventReward>;

@Schema({ timestamps: true, collection: 'eventRewards' })
export class EventReward {
  id!: string;

  @Prop({ required: true })
  eventId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true, default: 'active', enum: ['active', 'stop'] })
  status!: 'active' | 'stop';

  @Prop({ type: Object, required: true })
  payload!: RewardPayload;

  stop() {
    this.status = 'stop';
  }
}

export const EventRewardSchema = SchemaFactory.createForClass(EventReward);
