type TimeUnit = "hour" | "min" | "sec";
type DateUnit = "day" | "month" | "week";
type DateTimeUnit = DateUnit | TimeUnit;

interface TimeDiff {
  unit: TimeUnit | "day";
  value: number;
}

const DATETIME_UNIT: Record<DateTimeUnit, number> = {
  day: 86400000,
  hour: 3600000,
  min: 60000,
  month: 2592000000,
  sec: 1000,
  week: 604800000,
};

const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  month: "2-digit",
  second: "2-digit",
  year: "numeric",
});

const dateToMap = (date: Date): Record<string, string> => {
  const parts = dateTimeFormat.formatToParts(date);
  return parts.reduce<Record<string, string>>((acc, entry) => {
    acc[entry.type] = entry.value;
    return acc;
  }, {});
};

const dateString = (date: Date): string => {
  const map = dateToMap(date);
  return `${map.year}-${map.month}-${map.day}`;
};

const dateTimeString = (date: Date): string => {
  const map = dateToMap(date);
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}`;
};

const dateToFileName = (date: Date): string => {
  const map = dateToMap(date);
  return `${map.year}-${map.month}-${map.day}_${map.hour}-${map.minute}-${map.second}`;
};

const getTimeDiff = (d1: Date, d2: Date): TimeDiff => {
  const diff = d1.getTime() - d2.getTime();
  const units = ["day", "hour", "min", "sec"] as const;

  for (const unit of units) {
    if (diff >= DATETIME_UNIT[unit]) {
      return {
        unit,
        value: Math.round(diff / DATETIME_UNIT[unit]),
      };
    }
  }

  throw Error("Unexpected time difference");
};

const nowISO = (): string => new Date().toISOString();

const endOfDay = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(23, 59, 59, 999);
  return res;
};

const startOfDay = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(0, 0, 0, 0);
  return res;
};

export type { DateTimeUnit, DateUnit, TimeDiff, TimeUnit };
export {
  DATETIME_UNIT,
  dateString,
  dateTimeString,
  dateToFileName,
  getTimeDiff,
  endOfDay,
  nowISO,
  startOfDay,
};
