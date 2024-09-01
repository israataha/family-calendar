import React, { useState } from "react";
import { Alert } from "react-native";
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars";
import { filter, find, groupBy } from "lodash";

import { timeline_Events, getDate } from "../../data/timeline_events";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = timeline_Events;

export default function Timeline() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start)) as { [key: string]: TimelineEventProps[] }
  );

  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  const onDateChanged = (date: string, source: string) => {
    console.log("TimelineCalendarScreen onDateChanged: ", date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  };

  const createNewEvent: TimelineProps["onBackgroundLongPress"] = (timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      id: "draft",
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: "New Event",
      color: "white",
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
        setEventsByDate(eventsByDate);
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        setEventsByDate({ ...eventsByDate });
      }
    }
  };

  const approveNewEvent: TimelineProps["onBackgroundLongPressOut"] = (_timeString, timeObject) => {
    Alert.prompt("New Event", "Enter event title", [
      {
        text: "Cancel",
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = filter(eventsByDate[timeObject.date], (e) => e.id !== "draft");

            setEventsByDate(eventsByDate);
          }
        },
      },
      {
        text: "Create",
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = find(eventsByDate[timeObject.date], { id: "draft" });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? "New Event";
              draftEvent.color = "lightgreen";
              eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];

              setEventsByDate(eventsByDate);
            }
          }
        },
      },
    ]);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      numberOfDays={1}
    >
      <ExpandableCalendar
        firstDay={1}
        //leftArrowImageSource={require("../img/previous.png")}
        //rightArrowImageSource={require("../img/next.png")}
        markedDates={marked}
      />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToNow
        //initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
}
