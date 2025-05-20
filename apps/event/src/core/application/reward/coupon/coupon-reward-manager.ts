import { Injectable } from '@nestjs/common';
import { RewardManager } from '../../../domain/reward.manager';

export interface CouponReward {
  couponId: string;
  quantity: number;
}

@Injectable()
export class CouponRewardManager implements RewardManager<CouponReward> {
  readonly type = 'COUPON';

  constructor() {}

  async give(userId: string, reward: CouponReward): Promise<boolean> {

    return true;
  }

  isValidPayload(payload: CouponReward): boolean {
    return 'couponId' in payload
           && 'quantity' in payload
           && payload.quantity > 0;
  }


}
