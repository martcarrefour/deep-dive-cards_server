enum TimeUnit {
    Seconds = 's',
    Minutes = 'm',
    Hours = 'h',
    Days = 'd',
}

const multiplier: Record<TimeUnit, number> = {
    [TimeUnit.Seconds]: 1,
    [TimeUnit.Minutes]: 60,
    [TimeUnit.Hours]: 3600,
    [TimeUnit.Days]: 86400,
};

export function convertToSecondsUtil(timeStr: string): number | undefined {
    if (!isNaN(+timeStr)) {
        return parseInt(timeStr);
    }

    const unit = timeStr[timeStr.length - 1].toLowerCase() as TimeUnit;
    const unitMultiplier = multiplier[unit];

    if (unitMultiplier !== undefined) {
        const numericValue = parseInt(timeStr.slice(0, -1));
        if (!isNaN(numericValue)) {
            return numericValue * unitMultiplier;
        }
    }

    return undefined;
}
