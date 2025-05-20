import { toMillisecond } from '@common/util/date.util';

export const authConfig = () => ({
  REFRESH_TOKEN_EXPIRES_IN_MS: toMillisecond({ day: 7 }),
  MONGO_URI: 'mongodb://localhost:27017/assignment',
});
