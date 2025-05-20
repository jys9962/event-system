import { Event, EventDocument, EventMakeParam } from '../entity/event';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventRepository {

  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
  ) {}

  find(id: string): Promise<Event | null> {
    return this.eventModel.findById(id);
  }

  async save(event: Event | EventMakeParam): Promise<void> {
    await this.eventModel.create(event);
  }

}
