const A_SECOND = 1000;
const A_MINUTE = 60 * A_SECOND;
const A_HOUR = 60 * A_MINUTE;
const A_DAY = 24 * A_HOUR;

export function addHours(numOfHours: number): Date {
  const currentDate = Date.now();
  const date = new Date();
  date.setTime(currentDate + numOfHours * A_HOUR);
  return date;
}

export function relativeTimeFormatter(time: Date): string {
  time.setTime(time.getTime() + 9 * A_HOUR);
  //9시간 더해줌

  const timeDifference = time.getTime() - Date.now();
  const absOfTimeDifference = Math.abs(timeDifference);
  const formatter = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (absOfTimeDifference > A_DAY)
    return formatter.format(Math.ceil(timeDifference / A_DAY), "day");
  if (absOfTimeDifference > A_HOUR)
    return formatter.format(Math.ceil(timeDifference / A_HOUR), "hour");
  if (absOfTimeDifference > A_MINUTE)
    return formatter.format(Math.ceil(timeDifference / A_MINUTE), "minute");
  return formatter.format(Math.ceil(timeDifference / A_SECOND), "second");
}
