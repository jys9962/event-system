import { Injectable } from '@nestjs/common';
import { RequirementsManager } from '../../../domain/requirements.manager';
import { Promise } from 'mongoose';

interface InviteFriendsRequirements {
  count: number;
}

@Injectable()
export class InviteFriendManager implements RequirementsManager<InviteFriendsRequirements> {
  readonly type = 'INVITE_FRIENDS';

  constructor() {}

  isSatisfied(userId: string, requirements: InviteFriendsRequirements): Promise<boolean> {
    return Promise.resolve(false);
  }

  isValidPayload(payload: InviteFriendsRequirements): boolean {
    return 'count' in payload
           && payload.count > 0;
  }

}
