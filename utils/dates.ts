import { EventDuration } from "@/types";

export const getDate = (date: string | Date): string => {
  return new Date(date).toISOString().split("T")[0];
};

export const getEventDuration = (startDate: string | Date, endDate: string | Date): EventDuration => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  var millisecondsDiff = Math.abs(end.getTime() - start.getTime());

  // Convert milliseconds to total minutes
  const totalMinutes = Math.floor(millisecondsDiff / (1000 * 60));

  // Extract hours and remaining minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};
