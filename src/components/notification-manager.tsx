'use client';

import * as React from 'react';
import { useUser } from '@/hooks/use-user';
import { events } from '@/lib/data/events';
import { trainings } from '@/lib/data/trainings';
import type { Event, Training } from '@/lib/types';

const allItems = [...events, ...trainings];

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  const datePart = dateStr.split(', ')[1];
  if (!datePart) return new Date();
  const cleanDateStr = datePart.replace(/(\d+)(st|nd|rd|th)/, '$1');
  return new Date(`${cleanDateStr} 2025`);
};

const parseStartTime = (timeStr: string, date: Date): Date => {
  const newDate = new Date(date);
  const startTimeStr = timeStr.split('–')[0].trim();
  const [time, modifier] = startTimeStr.toLowerCase().split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  minutes = minutes || 0;

  if (modifier === 'pm' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'am' && hours === 12) {
    hours = 0;
  }
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};


export function NotificationManager() {
  const { user } = useUser();
  const scheduledNotifications = React.useRef<NodeJS.Timeout[]>([]);

  React.useEffect(() => {
    // Clear any existing timeouts when bookmarks change
    scheduledNotifications.current.forEach(clearTimeout);
    scheduledNotifications.current = [];

    if (!user || typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const now = new Date();

    user.bookmarkedEventIds.forEach(id => {
      const item = allItems.find(i => i.id === id);
      if (!item) return;

      const eventDate = parseDate(item.date);
      const startTime = parseStartTime(item.time, eventDate);

      // Notify 15 minutes before
      const notificationTime = new Date(startTime.getTime() - 15 * 60 * 1000);
      
      if (notificationTime > now) {
        const timeoutDuration = notificationTime.getTime() - now.getTime();
        const timeoutId = setTimeout(() => {
          const title = 'trainer' in item ? (item as Training).topic : (item as Event).title;
          const location = 'venue' in item ? (item as Training).venue : (item as Event).location;
          new Notification('Upcoming Event Reminder', {
            body: `${title} is starting in 15 minutes at ${location}.`,
            icon: '/logos/layipo25.png',
          });
        }, timeoutDuration);

        scheduledNotifications.current.push(timeoutId);
      }
    });

    // Cleanup function to clear timeouts when component unmounts
    return () => {
      scheduledNotifications.current.forEach(clearTimeout);
    };

  }, [user?.bookmarkedEventIds, user]);

  return null; // This component doesn't render anything
}
