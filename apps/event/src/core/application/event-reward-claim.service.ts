import { Injectable } from '@nestjs/common';
import { Event } from '../domain/entity/event';
import { EventRewardClaimRepository } from '../domain/repository/event-reward-claim.repository';
import { RequirementManagerGetter } from './requirements/requirement-manager.getter';
import { RewardManagerGetter } from './reward/reward-manager.getter';
import { EventRewardRepository } from '../domain/repository/event-reward.repository';
import { EventRepository } from '../domain/repository/event.repository';
import {
  GetEventRewardHistoryForAllUsers,
  GetUserRewardHistory,
  ListRewardsForEvent,
  RequestReward,
} from '@common/services/event/event-app.service.method';
import { EventRewardClaim } from '../domain/entity/event-reward-claim';

@Injectable()
export class EventRewardClaimService {

  constructor(
    private readonly eventRewardClaimRepository: EventRewardClaimRepository,
    private readonly eventRewardRepository: EventRewardRepository,
    private readonly requirementCheckerProvider: RequirementManagerGetter,
    private readonly rewardStrategyProvider: RewardManagerGetter,
    private readonly eventRepository: EventRepository,
  ) {}

  async requestReward({
    eventId,
    userId,
  }: RequestReward.RequestRewardRequest): Promise<RequestReward.RequestRewardResponse> {
    const claim = EventRewardClaim.create({ userId, eventId });
    const failMessage = await this.getFailMessage(eventId, userId);

    if (failMessage) {
      claim.setFail(failMessage);
      await this.eventRewardClaimRepository.save(claim);
      return {
        success: false,
        reason: failMessage,
      };
    }

    claim.setSuccess();
    await this.eventRewardClaimRepository.save(claim);
    await this.giveReward(eventId, userId);
    return {
      success: true,
    };
  }

  async getFailMessage(eventId: string, userId: string): Promise<string | null> {
    const event = await this.eventRepository.find(eventId);

    const eventIsActive = event && this.isActiveEvent(new Date(), event);
    if (!eventIsActive) {
      return 'event is not active';
    }

    const hasReceivedReward = await this.hasReceiveReward(userId, event);
    if (hasReceivedReward) {
      return 'already received reward';
    }

    const isSatisfiedRequirements = await this.isSatisfiedRequirements(userId, event);
    if (!isSatisfiedRequirements) {
      return 'not satisfied requirements';
    }

    return null;
  }

  getEventRewardHistoryForAllUsers(data: GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersRequest): Promise<GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersResponse> {
    return null as any
  }

  getUserRewardHistory(data: GetUserRewardHistory.GetUserRewardHistoryRequest): Promise<GetUserRewardHistory.GetUserRewardHistoryResponse> {
    return null as any
  }

  listRewardsForEvent(data: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse> {
    return null as any
  }

  private async giveReward(eventId: string, userId: string) {
    const rewards = await this.eventRewardRepository.findByEventId(eventId);

    for (const reward of rewards) {
      const rewardGiver = this.rewardStrategyProvider.get(reward.type);
      await rewardGiver.give(userId, reward);
    }
  }

  private async hasReceiveReward(userId: string, event: Event) {
    return this.eventRewardClaimRepository.exists(userId, event.id);
  }

  private isSatisfiedRequirements(userId: string, event: Event) {
    const requirements = event.getRequirements();
    const requirementsChecker = this.requirementCheckerProvider.get(requirements.type);
    return requirementsChecker.isSatisfied(userId, requirements);
  }

  private isActiveEvent(now: Date, event: Event) {
    return event.isActive(now);
  }


}
