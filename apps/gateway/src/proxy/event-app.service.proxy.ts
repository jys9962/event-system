import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventAppService } from '@common/services/event/event-app.service';
import { BaseProxy } from '@common/proxy/base.proxy';
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

@Injectable()
export class EventAppServiceProxy extends BaseProxy implements EventAppService {

  constructor(
    @Inject('EVENT_SERVICE')
    client: ClientProxy,
  ) {
    super(client);
  }

  activateEvent(data: ActivateEvent.ActivateEventRequest): Promise<ActivateEvent.ActivateEventResponse> {
    return this.send(ActivateEvent.pattern, data);
  }

  addRewardToEvent(data: AddRewardToEvent.AddRewardToEventRequest): Promise<AddRewardToEvent.AddRewardToEventResponse> {
    return this.send(AddRewardToEvent.pattern, data);
  }

  createEvent(data: CreateEvent.CreateEventRequest): Promise<CreateEvent.CreateEventResponse> {
    return this.send(CreateEvent.pattern, data);
  }

  getEvent(data: GetEvent.GetEventRequest): Promise<GetEvent.GetEventResponse> {
    return this.send(GetEvent.pattern, data);
  }

  getEventRewardHistoryForAllUsers(data: GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersRequest): Promise<GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersResponse> {
    return this.send(GetEventRewardHistoryForAllUsers.pattern, data);
  }

  getUserRewardHistory(data: GetUserRewardHistory.GetUserRewardHistoryRequest): Promise<GetUserRewardHistory.GetUserRewardHistoryResponse> {
    return this.send(GetUserRewardHistory.pattern, data);
  }

  listEvents(data: ListEvents.ListEventsRequest): Promise<ListEvents.ListEventsResponse> {
    return this.send(ListEvents.pattern, data);
  }

  listRewardsForEvent(data: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse> {
    return this.send(ListRewardsForEvent.pattern, data);
  }

  removeRewardFromEvent(data: RemoveRewardFromEvent.RemoveRewardFromEventRequest): Promise<RemoveRewardFromEvent.RemoveRewardFromEventResponse> {
    return this.send(RemoveRewardFromEvent.pattern, data);
  }

  requestReward(data: RequestReward.RequestRewardRequest): Promise<RequestReward.RequestRewardResponse> {
    return this.send(RequestReward.pattern, data);
  }

}
