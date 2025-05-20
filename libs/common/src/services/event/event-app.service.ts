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

export abstract class EventAppService {

  /* event */
  abstract createEvent(data: CreateEvent.CreateEventRequest): Promise<CreateEvent.CreateEventResponse>;

  abstract getEvent(data: GetEvent.GetEventRequest): Promise<GetEvent.GetEventResponse>;

  abstract activateEvent(data: ActivateEvent.ActivateEventRequest): Promise<ActivateEvent.ActivateEventResponse>

  abstract listEvents(data: ListEvents.ListEventsRequest): Promise<ListEvents.ListEventsResponse>;

  /* reward */
  abstract addRewardToEvent(data: AddRewardToEvent.AddRewardToEventRequest): Promise<AddRewardToEvent.AddRewardToEventResponse>;

  abstract removeRewardFromEvent(data: RemoveRewardFromEvent.RemoveRewardFromEventRequest): Promise<RemoveRewardFromEvent.RemoveRewardFromEventResponse>;

  abstract listRewardsForEvent(data: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse>;

  /* claim */
  abstract requestReward(data: RequestReward.RequestRewardRequest): Promise<RequestReward.RequestRewardResponse>;

  abstract getUserRewardHistory(data: GetUserRewardHistory.GetUserRewardHistoryRequest): Promise<GetUserRewardHistory.GetUserRewardHistoryResponse>;

  abstract getEventRewardHistoryForAllUsers(data: GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersRequest): Promise<GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersResponse>;

}
