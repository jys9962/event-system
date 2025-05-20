import { Injectable } from '@nestjs/common';
import { RewardManager } from '../../../domain/reward.manager';

export interface ItemReward {
  itemId: string;
  quantity: number;
}

@Injectable()
export class ItemRewardManager implements RewardManager<ItemReward> {
  readonly type = 'ITEM';

  constructor() {}

  async give(userId: string, reward: ItemReward) {

    return true;
  }

  isValidPayload(payload: ItemReward): boolean {
    return 'itemId' in payload
           && 'quantity' in payload
           && payload.quantity > 0;
  }

}
