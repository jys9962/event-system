import { Controller } from '@nestjs/common';
import { EventAppService } from '@common/services/event/event-app.service';
import {
  ActivateEvent,
  AddRewardToEvent,
  CreateEvent,
  GetEvent,
  GetEventRewardHistoryForAllUsers,
  GetUserRewardHistory,
  ListEvents,
  ListRewardsForEvent,
  RemoveRewardFromEvent,
  RequestReward,
} from '@common/services/event/event-app.service.method';
import { EventService } from '../application/event.service';
import { EventRewardService } from '../application/event-reward.service';
import { EventRewardClaimService } from '../application/event-reward-claim.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EventAppServiceController implements EventAppService {

  constructor(
    private readonly eventService: EventService,
    private readonly eventRewardService: EventRewardService,
    private readonly eventRewardClaimService: EventRewardClaimService,
  ) {}


  @MessagePattern(CreateEvent.pattern)
  async createEvent(data: CreateEvent.CreateEventRequest): Promise<CreateEvent.CreateEventResponse> {
    await this.eventService.createEvent(data);
    return { result: true };
  }

  @MessagePattern(GetEvent.pattern)
  getEvent(data: GetEvent.GetEventRequest): Promise<GetEvent.GetEventResponse> {
    return null as any;
  }

  @MessagePattern(AddRewardToEvent.pattern)
  async addRewardToEvent(data: AddRewardToEvent.AddRewardToEventRequest): Promise<AddRewardToEvent.AddRewardToEventResponse> {
    await this.eventRewardService.addRewardToEvent(data);
    return { result: true };
  }

  @MessagePattern(ActivateEvent.pattern)
  async activateEvent(data: ActivateEvent.ActivateEventRequest): Promise<ActivateEvent.ActivateEventResponse> {
    await this.eventService.activateEvent(data);
    return { result: true };
  }

  @MessagePattern(GetEventRewardHistoryForAllUsers.pattern)
  getEventRewardHistoryForAllUsers(data: GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersRequest): Promise<GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersResponse> {
    return this.eventRewardClaimService.getEventRewardHistoryForAllUsers(data);
  }

  @MessagePattern(GetUserRewardHistory.pattern)
  getUserRewardHistory(data: GetUserRewardHistory.GetUserRewardHistoryRequest): Promise<GetUserRewardHistory.GetUserRewardHistoryResponse> {
    return this.eventRewardClaimService.getUserRewardHistory(data);
  }

  @MessagePattern(ListEvents.pattern)
  listEvents(data: ListEvents.ListEventsRequest): Promise<ListEvents.ListEventsResponse> {
    return this.eventService.listEvents(data);
  }

  @MessagePattern(ListRewardsForEvent.pattern)
  listRewardsForEvent(data: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse> {
    return this.eventRewardService.listRewardsForEvent(data);
  }

  @MessagePattern(RemoveRewardFromEvent.pattern)
  async removeRewardFromEvent(data: RemoveRewardFromEvent.RemoveRewardFromEventRequest): Promise<RemoveRewardFromEvent.RemoveRewardFromEventResponse> {
    await this.eventRewardService.removeRewardFromEvent(data);
    return { result: true };
  }

  @MessagePattern(RequestReward.pattern)
  requestReward(data: RequestReward.RequestRewardRequest): Promise<RequestReward.RequestRewardResponse> {
    return this.eventRewardClaimService.requestReward(data);
  }

}
