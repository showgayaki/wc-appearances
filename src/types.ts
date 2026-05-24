export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type RegularProgram = {
  id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
  station_name: string;
  program_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ExtraProgram = {
  id: string;
  program_date: string;
  start_time: string | null;
  end_time: string | null;
  station_name: string;
  program_name: string;
  title_suffix: string | null;
  created_at: string;
  updated_at: string;
};

export type PostHeader = {
  id: string;
  title: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type ProgramInput = {
  weekday: Weekday;
  start_time: string;
  end_time: string;
  station_name: string;
  program_name: string;
  is_active: boolean;
};

export type ExtraProgramInput = {
  program_date: string;
  start_time: string | null;
  end_time: string | null;
  station_name: string;
  program_name: string;
  title_suffix: string | null;
};

export type PostHeaderInput = {
  title: string;
  is_default: boolean;
};

export type GeneratedProgram = {
  id: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  stationName: string;
  programName: string;
  titleSuffix: string | null;
  source: "regular" | "extra";
};
