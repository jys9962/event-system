import { Injectable } from '@nestjs/common';
import { RewardManagerGetter } from './reward/reward-manager.getter';
import { RequirementManagerGetter } from './requirements/requirement-manager.getter';
import { EventRewardClaimRepository } from '../domain/repository/event-reward-claim.repository';
import { EventRewardRepository } from '../domain/repository/event-reward.repository';
import {
  AddRewardToEvent,
  ListRewardsForEvent,
  RemoveRewardFromEvent,
} from '@common/services/event/event-app.service.method';
import { Promise } from 'mongoose';
import { Reward } from '../domain/reward';

@Injectable()
export class EventRewardService {

  constructor(
    private readonly rewardManagerGetter: RewardManagerGetter,
    private readonly eventRewardClaimRepository: EventRewardClaimRepository,
    private readonly requirementCheckerProvider: RequirementManagerGetter,
    private readonly eventRewardRepository: EventRewardRepository,
    private readonly rewardStrategyProvider: RewardManagerGetter,
  ) {}


  async addRewardToEvent(data: AddRewardToEvent.AddRewardToEventRequest): Promise<void> {
    const rewardManager = this.rewardManagerGetter.get(data.type);
    if (!rewardManager.isValidPayload(data.payload)) {
      throw Error('invalid payload');
    }

    const reward: Reward = {
      type: data.type,
      payload: data.payload,
    };

    await this.eventRewardRepository.addReward(data.eventId, reward);
  }

  listRewardsForEvent({ eventId }: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse> {
    return this.eventRewardRepository.findByEventId(eventId);
  }

  async removeRewardFromEvent({ rewardId }: RemoveRewardFromEvent.RemoveRewardFromEventRequest): Promise<void> {
    const reward = await this.eventRewardRepository.findById(rewardId);
    if (!reward) {
      return;
    }

    reward.stop();
    await this.eventRewardRepository.save(reward);
  }


}
