'use client';

import { useEffect, useState } from 'react';

type CalendarDay = { year: number; month: number; day: number };
const ZONE = 'Europe/Prague';

function pragueCalendarDay(date: Date): CalendarDay {
  const parts = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: ZONE,
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}

function calendarIndex(day: CalendarDay): number {
  return Math.floor(Date.UTC(day.year, day.month - 1, day.day) / 86_400_000);
}

export function formatArticleDate(value: string, now: Date): string {
  const hasTime = value.includes('T');
  const published = hasTime
    ? pragueCalendarDay(new Date(value))
    : (() => {
        const [year, month, day] = value.slice(0, 10).split('-').map(Number);
        return { year, month, day };
      })();
  const today = pragueCalendarDay(now);
  const daysAgo = calendarIndex(today) - calendarIndex(published);
  const shortDate = published.day + '. ' + published.month + '.';
  const label = daysAgo === 0
    ? 'Dnes ' + shortDate
    : daysAgo === 1
      ? 'Včera ' + shortDate
      : shortDate + ' ' + published.year;

  if (!hasTime) return label;
  const time = new Intl.DateTimeFormat('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: ZONE,
  }).format(new Date(value));
  return label + ', ' + time;
}

/**
 * Datum se po hydrataci přepočítává v pražském časovém pásmu.
 * Samotná stránka může zůstat statická, aniž by „Včera“ zastaralo.
 */
export default function ArticleDate({ value, fallback }: { value: string; fallback: string }) {
  const [label, setLabel] = useState(fallback);

  useEffect(() => {
    const refresh = () => setLabel(formatArticleDate(value, new Date()));
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [value]);

  return <time dateTime={value}>{label}</time>;
}
