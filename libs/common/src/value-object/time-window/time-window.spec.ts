import { TimeWindow } from '@common/value-object/time-window/time-window';

describe('TimeWindow', function () {
  describe('contain()', function () {

    it.each([
      {
        title: '시작시간 이전은 포함되지 않는다.',
        sut: ['2022-01-02T00:00:00Z', '2022-01-03T00:00:00Z'],
        target: '2022-01-01T00:00:00Z',
        expected: false,
      },
      {
        title: '시작시간은 포함한다.',
        sut: ['2022-01-01T00:00:00Z', '2022-01-02T00:00:00Z'],
        target: '2022-01-01T00:00:00Z',
        expected: true,
      },
      {
        title: '시작과 종료 사이에 있으면 포함된다.',
        sut: ['2022-01-01T00:00:00Z', '2022-01-02T00:00:00Z'],
        target: '2022-01-01T11:00:00Z',
        expected: true,
      },
      {
        title: '종료시간은 포함하지 않는다.',
        sut: ['2022-01-01T00:00:00Z', '2022-01-02T00:00:00Z'],
        target: '2022-01-02T00:00:00Z',
        expected: false,
      },
      {
        title: '종료시간 이후는 포함되지 않는다.',
        sut: ['2022-01-01T00:00:00Z', '2022-01-02T00:00:00Z'],
        target: '2022-01-03T00:00:00Z',
        expected: false,
      },
    ])('$title', async function ({ sut: [start, end], target, expected }) {
      const period = new TimeWindow(
        new Date(start),
        new Date(end),
      );

      const result = period.contains(
        new Date(target),
      );

      expect(result).toBe(expected);
    });
  });
});
