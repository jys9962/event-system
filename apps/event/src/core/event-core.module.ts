import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './domain/entity/event';
import { EventRewardClaim, EventRewardClaimSchema } from './domain/entity/event-reward-claim';
import { EventReward, EventRewardSchema } from './domain/entity/event-reward';
import { EventAppServiceController } from './presentation/event-app-service.controller';
import { RewardGiverList, RewardManagerGetter } from './application/reward/reward-manager.getter';
import {
  RequirementCheckerList,
  RequirementManagerGetter,
} from './application/requirements/requirement-manager.getter';
import { RewardManager } from './domain/reward.manager';
import { RequirementsManager } from './domain/requirements.manager';
import { EventService } from './application/event.service';
import { EventRewardService } from './application/event-reward.service';
import { EventRewardClaimService } from './application/event-reward-claim.service';
import { EventRepository } from './domain/repository/event.repository';
import { EventRewardRepository } from './domain/repository/event-reward.repository';
import { EventRewardClaimRepository } from './domain/repository/event-reward-claim.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: EventRewardClaim.name, schema: EventRewardClaimSchema },
      { name: EventReward.name, schema: EventRewardSchema },
    ]),
  ],
  controllers: [
    EventAppServiceController,
  ],
  providers: [
    EventService,
    EventRewardService,
    EventRewardClaimService,

    EventRepository,
    EventRewardRepository,
    EventRewardClaimRepository,

    ...RewardGiverList,
    ...RequirementCheckerList,
    {
      provide: RewardManagerGetter,
      useFactory: (
        ...giverList: RewardManager<any>[]
      ) => new RewardManagerGetter(giverList),
      inject: [
        ...RewardGiverList,
      ],
    },
    {
      provide: RequirementManagerGetter,
      useFactory: (
        ...requirementCheckerList: RequirementsManager<any>[]
      ) => new RequirementManagerGetter(requirementCheckerList),
      inject: [
        ...RequirementCheckerList,
      ],
    },
  ],
  exports: [],
})
export class EventCoreModule {}
