export function formatToDate(date: any) {
  if (isNaN(date)) return new Date(date);
  return new Date(+date);
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function formateDateToLongNotation (date: Date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]} '${date
      .getFullYear()
      .toLocaleString()
      .substr(-2)}`;
}
