import { EventRewardClaim, EventRewardClaimDocument } from '../entity/event-reward-claim';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventRewardClaimRepository {

  constructor(
    @InjectModel(EventRewardClaim.name)
    private readonly eventRewardClaimModel: Model<EventRewardClaimDocument>,
  ) {}

  exists(userId: string, eventId: string): Promise<boolean> {
    return null as any;
  }

  find(userId: string, eventId: string): Promise<EventRewardClaim | null> {
    return null as any;
  }

  save(eventRewardClaim: EventRewardClaim): Promise<void> {
    return null as any;
  }


  async create(userId: string, eventId: string): Promise<EventRewardClaim> {
    return this.eventRewardClaimModel.create({
      eventId: eventId,
      userId: userId,
    });
  }
}
