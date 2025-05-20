import { DailyLoginManager } from './daily-login/daily-login.manager';
import { InviteFriendManager } from './invite-friend/invite-friend.manager';
import { RequirementsManager } from '../../domain/requirements.manager';

export const RequirementCheckerList = [
  DailyLoginManager,
  InviteFriendManager,
];

export class RequirementManagerGetter {

  constructor(
    private readonly checkerList: RequirementsManager<any>[],
  ) {}

  get(type: string): RequirementsManager<any> {
    const matchedChecker = this.checkerList.filter(t => t.type === type);
    if (matchedChecker.length !== 1) {
      throw new Error(
        `RequirementCheckerProvider: ${type} is not found`,
      );
    }

    return matchedChecker[0];
  }

}
