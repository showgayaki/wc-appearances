import type { GeneratedProgram, ExtraProgram, RegularProgram } from "../types";
import { formatDisplayDate, getDatesInRange, getWeekday, timeToMinutes } from "./date";

export const buildGeneratedPrograms = (
  regularPrograms: RegularProgram[],
  extraPrograms: ExtraProgram[],
  startDate: string,
  endDate: string,
): GeneratedProgram[] => {
  const dates = getDatesInRange(startDate, endDate);
  const regularItems = dates.flatMap((date) =>
    regularPrograms
      .filter((program) => program.is_active && program.weekday === getWeekday(date))
      .map<GeneratedProgram>((program) => ({
        id: `${program.id}-${date}`,
        date,
        startTime: program.start_time,
        endTime: program.end_time,
        stationName: program.station_name,
        programName: program.program_name,
        titleSuffix: null,
        source: "regular",
      })),
  );

  const extraItems = extraPrograms
    .filter((program) => program.program_date >= startDate && program.program_date <= endDate)
    .map<GeneratedProgram>((program) => ({
      id: program.id,
      date: program.program_date,
      startTime: program.start_time,
      endTime: program.end_time,
      stationName: program.station_name,
      programName: program.program_name,
      titleSuffix: program.title_suffix,
      source: "extra",
    }));

  return [...regularItems, ...extraItems].sort((left, right) => {
    if (left.date !== right.date) {
      return left.date.localeCompare(right.date);
    }
    return timeToMinutes(left.startTime ?? "00:00") - timeToMinutes(right.startTime ?? "00:00");
  });
};

const formatProgramTitle = (item: GeneratedProgram): string => {
  const suffix = item.titleSuffix?.trim();
  return suffix ? `${item.stationName}「${item.programName}」（${suffix}）` : `${item.stationName}「${item.programName}」`;
};

export const generateProgramText = (title: string, items: GeneratedProgram[]): string => {
  const blocks = items.map((item) => {
    const date = formatDisplayDate(item.date);
    const dateLine = item.startTime && item.endTime ? `${date}${item.startTime}〜${item.endTime}` : date;
    return `${dateLine}\n${formatProgramTitle(item)}`;
  });

  const titleBlock = title.trim();
  return [titleBlock, ...blocks].filter((block) => block.length > 0).join("\n\n");
};
