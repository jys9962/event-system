export class TimeWindow {
  constructor(
    readonly start: Date,
    readonly end: Date,
  ) {}

  contains(now: Date): boolean {
    return this.start <= now
           && now < this.end;
  }
}
