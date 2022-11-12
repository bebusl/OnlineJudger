export function addHours(numOfHours: number): Date {
  const currentDate = Date.now();
  const date = new Date();
  date.setTime(currentDate + numOfHours * 60 * 60 * 1000);
  return date;
}
