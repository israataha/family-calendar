import * as Calendar from "expo-calendar";
import { getDate, getEventDuration } from "./dates";

export const getCalendarEvents = (events: Calendar.Event[], calendars: Calendar.Calendar[]) => {
  return events.map((event) => {
    const calendar = calendars.find((calendar) => calendar.id === event.calendarId);
    const eventDate = getDate(event.startDate);

    return {
      [eventDate]: {
        calendar: calendar?.title,
        color: calendar?.color,
        title: event.title,
        allDay: event.allDay,
        startDate: event.startDate,
        endDate: event.endDate,
        duration: event.allDay ? null : getEventDuration(event.startDate, event.endDate),
      },
    };
  });
};
