import { Injectable } from '@nestjs/common';
import { RequirementsManager } from '../../../domain/requirements.manager';
import { Promise } from 'mongoose';

interface DailyLoginRequirements {
  count: number;
}

@Injectable()
export class DailyLoginManager implements RequirementsManager<DailyLoginRequirements> {
  readonly type = 'DAILY_LOGIN';

  isValidPayload(payload: DailyLoginRequirements): boolean {
    return 'count' in payload
           && payload.count > 0;
  }

  isSatisfied(userId: string, requirements: DailyLoginRequirements): Promise<boolean> {
    return Promise.resolve(false);
  }

}
