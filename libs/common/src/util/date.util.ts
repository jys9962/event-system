export const toMillisecond =
  (param: {
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  }) => {
    return (param.millisecond || 0)
           + ((param.second || 0) * 1000)
           + ((param.minute || 0) * 60 * 1000)
           + ((param.hour || 0) * 60 * 60 * 1000)
           + ((param.day || 0) * 24 * 60 * 60 * 1000);
  };

export const addTime =
  (date: Date, param: {
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  }) => new Date(date.getTime() + toMillisecond(param));
