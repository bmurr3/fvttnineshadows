import { DateTime, HourNumbers, MinuteNumbers, SecondNumbers } from "luxon";

enum TimeChangeMode {
    ADVANCE,
    RETRACT,
}

class TimeOfDay {
    constructor(
        public readonly hour: HourNumbers,
        public readonly minute: MinuteNumbers,
        public readonly second: SecondNumbers,
    ) {}

    static DAWN = new TimeOfDay(6, 58, 42);
    static NOON = new TimeOfDay(12, 0, 0);
    static DUSK = new TimeOfDay(19, 14, 12);
    static MIDNIGHT = new TimeOfDay(0, 0, 0);

    diffSeconds(worldTime: DateTime, mode: TimeChangeMode): number {
        const targetTime = worldTime.set(this);
        const targetDayDifference = TimeOfDay.diffDays(worldTime, targetTime, mode);
        const targetDay = worldTime.plus({ day: targetDayDifference });

        return targetDay.set(this).diff(worldTime, "seconds").seconds;
    }

    private static diffDays(currentTime: DateTime, targetTime: DateTime, mode: TimeChangeMode): -1 | 0 | 1 {
        if (currentTime >= targetTime && mode === TimeChangeMode.ADVANCE) {
            return 1;
        } else if (currentTime <= targetTime && mode === TimeChangeMode.RETRACT) {
            return -1;
        } else {
            return 0;
        }
    }
}

export { TimeChangeMode, TimeOfDay };
