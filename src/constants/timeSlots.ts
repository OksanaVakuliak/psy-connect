export const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export function toTwentyFourHourTime(slot: string) {
  const [clock, meridiem] = slot.split(' ');
  const [hours, minutes] = clock.split(':');
  const hour = (Number(hours) % 12) + (meridiem === 'PM' ? 12 : 0);

  return `${String(hour).padStart(2, '0')}:${minutes}`;
}
