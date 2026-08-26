const WEEK_LENGTH = 7;
const WEEKS_SHOWN = 6;

const monthLabelFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const valueLabelFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function toDateValue(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateValue(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year, month - 1, day);
}

export function currentTime() {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function today() {
  return toDateValue(new Date());
}

export function shiftDays(value: string, days: number) {
  const date = fromDateValue(value);
  date.setDate(date.getDate() + days);

  return toDateValue(date);
}

export function shiftMonths(value: string, months: number) {
  const date = fromDateValue(value);
  const day = date.getDate();

  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));

  return toDateValue(date);
}

export function startOfWeek(value: string) {
  const date = fromDateValue(value);

  return shiftDays(value, -((date.getDay() + 6) % WEEK_LENGTH));
}

export function endOfWeek(value: string) {
  return shiftDays(startOfWeek(value), WEEK_LENGTH - 1);
}

export function monthLabel(value: string) {
  return monthLabelFormat.format(fromDateValue(value));
}

export function dateLabel(value: string) {
  return valueLabelFormat.format(fromDateValue(value));
}

export function isSameMonth(one: string, other: string) {
  return one.slice(0, 7) === other.slice(0, 7);
}

export function monthGrid(value: string) {
  const start = startOfWeek(`${value.slice(0, 7)}-01`);

  return Array.from({ length: WEEKS_SHOWN }, (_, week) =>
    Array.from({ length: WEEK_LENGTH }, (_, day) => shiftDays(start, week * WEEK_LENGTH + day)),
  );
}
