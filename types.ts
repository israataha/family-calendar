export type EventDuration = {
  hours: number;
  minutes: number;
};

export type EventDetails = {
  calendar: string;
  title: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  duration: EventDuration;
  color: string;
};

export type AgendaViewItem = Record<string, EventDetails>;
