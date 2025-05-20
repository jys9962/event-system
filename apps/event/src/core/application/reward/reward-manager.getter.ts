import { RewardManager } from '../../domain/reward.manager';
import { CouponRewardManager } from './coupon/coupon-reward-manager';
import { PointRewardManager } from './point/point-reward.manager';
import { ItemRewardManager } from './item/item-reward.manager';

export const RewardGiverList = [
  CouponRewardManager,
  PointRewardManager,
  ItemRewardManager,
];

export class RewardManagerGetter {
  constructor(
    private readonly giverList: RewardManager<any>[],
  ) {}

  get(type: string): RewardManager<any> {
    const matchedGiverList = this.giverList.filter(t => t.type === type);
    if (matchedGiverList.length !== 1) {
      throw Error();
    }

    const [giver] = matchedGiverList;
    return giver;
  }
}
