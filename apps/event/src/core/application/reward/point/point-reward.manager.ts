import { Injectable } from '@nestjs/common';
import { RewardManager } from '../../../domain/reward.manager';

export interface PointReward {
  amount: number;
}

@Injectable()
export class PointRewardManager implements RewardManager<PointReward> {
  readonly type = 'POINT';

  constructor() {}

  async give(userId: string, reward: PointReward) {
    return true;
  }

  isValidPayload(payload: PointReward): boolean {
    return 'amount' in payload
           && payload.amount > 0;
  }


}
