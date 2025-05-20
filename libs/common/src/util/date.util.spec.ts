import { toMillisecond } from '@common/util/date.util';

describe('DateUtil', function () {
  it('toMillisecond', function () {

    expect(toMillisecond({ day: 7 })).toBe(604800000);

  });
});
