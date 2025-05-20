import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { Role } from '@common/domain/role';
import { AllowRoles } from '../guard/allow-roles.decorator';

@ApiTags('이벤트')
@Controller('events')
export class EventGatewayController {

  constructor(
    private readonly eventAppService: EventAppService,
  ) {}

  @ApiOperation({ summary: '이벤트 생성' })
  @ApiResponse({ status: 201, description: '이벤트가 성공적으로 생성됨' })
  @AllowRoles(Role.Admin, Role.Operator)
  @Post('create')
  async createEvent(@Body() data: CreateEvent.CreateEventRequest): Promise<CreateEvent.CreateEventResponse> {
    return this.eventAppService.createEvent(data);
  }

  @ApiOperation({ summary: '이벤트 조회' })
  @ApiResponse({ status: 200, description: '이벤트 정보 반환' })
  @Post('get')
  async getEvent(@Body() data: GetEvent.GetEventRequest): Promise<GetEvent.GetEventResponse> {
    return this.eventAppService.getEvent(data);
  }

  @ApiOperation({ summary: '이벤트 활성화' })
  @ApiResponse({ status: 200, description: '이벤트가 성공적으로 활성화됨' })
  @AllowRoles(Role.Admin, Role.Operator)
  @Post('activate')
  async activateEvent(@Body() data: ActivateEvent.ActivateEventRequest): Promise<ActivateEvent.ActivateEventResponse> {
    return this.eventAppService.activateEvent(data);
  }

  @ApiOperation({ summary: '이벤트 목록 조회' })
  @ApiResponse({ status: 200, description: '이벤트 목록 반환' })
  @Post('list')
  async listEvents(@Body() data: ListEvents.ListEventsRequest): Promise<ListEvents.ListEventsResponse> {
    return this.eventAppService.listEvents(data);
  }

  /* reward */

  @ApiOperation({ summary: '이벤트에 보상 추가' })
  @ApiResponse({ status: 201, description: '보상이 성공적으로 추가됨' })
  @AllowRoles(Role.Admin, Role.Operator)
  @Post('reward/add')
  async addRewardToEvent(@Body() data: AddRewardToEvent.AddRewardToEventRequest): Promise<AddRewardToEvent.AddRewardToEventResponse> {
    return this.eventAppService.addRewardToEvent(data);
  }

  @ApiOperation({ summary: '이벤트에서 보상 제거' })
  @ApiResponse({ status: 200, description: '보상이 성공적으로 제거됨' })
  @AllowRoles(Role.Admin, Role.Operator)
  @Post('reward/remove')
  async removeRewardFromEvent(@Body() data: RemoveRewardFromEvent.RemoveRewardFromEventRequest): Promise<RemoveRewardFromEvent.RemoveRewardFromEventResponse> {
    return this.eventAppService.removeRewardFromEvent(data);
  }

  @ApiOperation({ summary: '이벤트의 보상 목록 조회' })
  @ApiResponse({ status: 200, description: '보상 목록 반환' })
  @Post('reward/list')
  async listRewardsForEvent(@Body() data: ListRewardsForEvent.ListRewardsForEventRequest): Promise<ListRewardsForEvent.RequestRewardResponse> {
    return this.eventAppService.listRewardsForEvent(data);
  }

  /* claim */

  @ApiOperation({ summary: '보상 요청' })
  @ApiResponse({ status: 200, description: '보상 요청 처리 결과' })
  @AllowRoles(Role.User)
  @Post('reward/request')
  async requestReward(@Body() data: RequestReward.RequestRewardRequest): Promise<RequestReward.RequestRewardResponse> {
    return this.eventAppService.requestReward(data);
  }

  @ApiOperation({ summary: '사용자 보상 히스토리 조회' })
  @ApiResponse({ status: 200, description: '사용자 보상 히스토리 반환' })
  @AllowRoles(Role.Admin, Role.Auditor)
  @Post('reward/history/user')
  async getUserRewardHistory(@Body() data: GetUserRewardHistory.GetUserRewardHistoryRequest): Promise<GetUserRewardHistory.GetUserRewardHistoryResponse> {
    return this.eventAppService.getUserRewardHistory(data);
  }

  @ApiOperation({ summary: '이벤트의 전체 사용자 보상 히스토리 조회' })
  @ApiResponse({ status: 200, description: '이벤트의 전체 사용자 보상 히스토리 반환' })
  @AllowRoles(Role.Admin, Role.Auditor)
  @Post('reward/history/event')
  async getEventRewardHistoryForAllUsers(@Body() data: GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersRequest): Promise<GetEventRewardHistoryForAllUsers.GetEventRewardHistoryForAllUsersResponse> {
    return this.eventAppService.getEventRewardHistoryForAllUsers(data);
  }

}
