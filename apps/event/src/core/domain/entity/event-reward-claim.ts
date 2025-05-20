import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type EventRewardClaimDocument = HydratedDocument<EventRewardClaim>;

@Schema({ timestamps: true, collection: 'eventRewardClaims' })
export class EventRewardClaim extends Document {
  @Prop({ required: true, type: String })
  userId!: string;

  @Prop({ required: true, type: String })
  eventId!: string;

  @Prop({ required: true, type: Boolean, default: false })
  isReward!: boolean;

  @Prop({ required: true, type: String })
  failReason!: string;

  updatedAt!: Date;
  createdAt!: Date;

  static create(
    param: Pick<EventRewardClaim, 'userId' | 'eventId'>,
    now = new Date(),
  ): EventRewardClaim {
    return Object.assign(new EventRewardClaim(), param, {
      isReward: false,
      failReason: '',
      updatedAt: now,
      createdAt: now,
    } satisfies Partial<EventRewardClaim>);
  }

  setSuccess(now: Date = new Date()) {
    this.isReward = true;
    this.updatedAt = now;
  }

  setFail(error: string, now = new Date()) {
    this.isReward = false;
    this.failReason = error;
    this.updatedAt = now;
  }
}

export const EventRewardClaimSchema = SchemaFactory.createForClass(EventRewardClaim);
