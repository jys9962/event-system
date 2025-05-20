import { RewardPayload } from './entity/event-reward';

export interface RewardManager<TPayload extends RewardPayload> {

  get type(): string;

  give(
    userId: string,
    reward: TPayload,
  ): Promise<boolean>;

  isValidPayload(payload: TPayload): boolean;

}
