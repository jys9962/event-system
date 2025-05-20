import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../entity/event';
import { EventRewardClaim, EventRewardClaimDocument } from '../entity/event-reward-claim';
import { EventReward, EventRewardDocument } from '../entity/event-reward';
import { Reward } from '../reward';

@Injectable()
export class EventRewardRepository {

  constructor(
    @InjectModel(EventReward.name)
    private readonly eventRewardModel: Model<EventRewardDocument>,
    @InjectModel(EventRewardClaim.name)
    private readonly eventRewardClaimModel: Model<EventRewardClaimDocument>,
  ) {}

  async findByEventId(eventId: string): Promise<EventReward[]> {
    return this.eventRewardModel.find({ eventId: eventId });
  }

  async addReward(eventId: string, reward: Reward) {
    await this.eventRewardModel.create({
      type: reward.type,
      payload: reward.payload,
      eventId: eventId,
    });
  }

  async findById(rewardId: string) {
    return this.eventRewardModel.findById(rewardId);
  }

  async save(reward: EventReward) {
    await this.eventRewardModel.findByIdAndUpdate(
      reward.id,
      {
        type: reward.type,
        eventId: reward.eventId,
        status: reward.status,
        payload: reward.payload,
      },
      { new: true },
    );
  }
}
