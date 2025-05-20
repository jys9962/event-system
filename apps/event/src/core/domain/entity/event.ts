import { TimeWindow } from '@common/value-object/time-window/time-window';
import { Requirements } from '../requirements';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NonFunctionProperties } from '@common/util/util.types';

export type EventStatus = 'pending' | 'active' | 'stop';

export type EventDocument = Event & Document;

@Schema({ timestamps: true, collection: 'events' })
export class Event {

  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, type: Date })
  startAt!: Date;

  @Prop({ required: true, type: Date })
  endAt!: Date;

  @Prop({ required: true })
  requirementsType!: string;

  @Prop({ required: true, type: Object })
  requirementsPayload!: Record<string, any>;

  @Prop({ required: true, default: 'pending', enum: ['pending', 'active', 'stop'] })
  status!: EventStatus;

  updatedAt!: Date;
  createdAt!: Date;

  getPeriod(): TimeWindow {
    return new TimeWindow(this.startAt, this.endAt);
  }

  getRequirements(): Requirements {
    return {
      type: this.requirementsType,
      payload: this.requirementsPayload,
    };
  }

  isActive(now = new Date()): boolean {
    return this.status === 'active'
           && this.getPeriod().contains(now);
  }

  update(data: EventMakeParam) {
    Object.assign(this, { ...data }, { updatedAt: new Date() });
  }

  activate(now = new Date()) {
    this.status = 'active';
    this.updatedAt = now;
  }
}

export type EventMakeParam = Omit<NonFunctionProperties<Event>, 'id' | 'createdAt' | 'updatedAt' | 'status'>

export const EventSchema = SchemaFactory.createForClass(Event);
