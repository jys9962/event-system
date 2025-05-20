import { Allow, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Requirements } from '../../../../../apps/event/src/core/domain/requirements';

export namespace CreateEvent {
  export const pattern = 'event.create-event';


  export class CreateEventRequest {
    @ApiProperty({ example: 'Summer Sale Event' })
    @IsString()
    name!: string;

    @ApiProperty({ example: '2024-01-01T00:00:00Z' })
    @IsDateString()
    startAt!: string;

    @ApiProperty({ example: '2024-12-31T23:59:59Z' })
    @IsDateString()
    endAt!: string;

    @ApiProperty({ example: { type: 'DAILY_LOGIN', payload: { count: 30 } } })
    @Allow()
    requirements!: Requirements;
  }

  export class CreateEventResponse {
    result!: boolean;
  }
}

export namespace GetEvent {
  export const pattern = 'event.get-event';

  export class GetEventRequest {
    @IsString()
    @IsString()
    eventId!: string;
  }

  export class GetEventResponse {
    result!: boolean;
  }
}

export namespace ActivateEvent {
  export const pattern = 'event.activate-event';

  export class ActivateEventRequest {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    eventId!: string;
  }

  export class ActivateEventResponse {
    result!: boolean;
  }
}

export namespace ListEvents {
  export const pattern = 'event.list-events';

  export class ListEventsRequest {}

  export class ListEventsResponse {

  }
}

export namespace AddRewardToEvent {
  export const pattern = 'event.add-reward-to-event';

  export class AddRewardToEventRequest {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    eventId!: string;
    @ApiProperty({ example: 'COUPON' })
    type!: string;
    @ApiProperty({ example: { couponId: 'COUPON123', quantity: 1 } })
    payload!: Record<string, any>;
  }

  export class AddRewardToEventResponse {
    result!: boolean;
  }

}

export namespace RemoveRewardFromEvent {
  export const pattern = 'event.remove-reward-from-event';

  export class RemoveRewardFromEventRequest {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    @IsString()
    rewardId!: string;
  }

  export class RemoveRewardFromEventResponse {
    result!: boolean;
  }
}

export namespace ListRewardsForEvent {
  export const pattern = 'event.list-rewards-for-event';

  export class ListRewardsForEventRequest {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    @IsString()
    eventId!: string;
  }

  export class RequestRewardResponse {}
}

export namespace RequestReward {
  export const pattern = 'event.request-reward';

  export class RequestRewardRequest {
    @ApiProperty({ example: 'user123' })
    userId!: string;
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    eventId!: string;
  }

  export class RequestRewardResponse {
    success!: boolean;

    reason?: string;
  }
}

export namespace GetUserRewardHistory {
  export const pattern = 'event.get-user-reward-history';

  export class GetUserRewardHistoryRequest {}

  export class GetUserRewardHistoryResponse {}
}

export namespace GetEventRewardHistoryForAllUsers {
  export const pattern = 'event.get-event-reward-history-for-all-users';

  export class GetEventRewardHistoryForAllUsersRequest {}

  export class GetEventRewardHistoryForAllUsersResponse {}
}
