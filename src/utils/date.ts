interface TimeDiff {
  value: number;
  unit: "days" | "hours" | "mins" | "secs";
}

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
  const secsDiff = Math.round((d1.getTime() - d2.getTime()) / 1000);
  if (secsDiff >= 3600) {
    if (secsDiff >= 86400) {
      return {
        unit: "days",
        value: Math.round(secsDiff / 86400),
      };
    }
    return {
      unit: "hours",
      value: Math.round(secsDiff / 3600),
    };
  } else if (secsDiff >= 60) {
    return {
      unit: "mins",
      value: Math.round(secsDiff / 60),
    };
  }
  return {
    unit: "secs",
    value: secsDiff,
  };
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

export { dateString, dateTimeString, dateToFileName, getTimeDiff, endOfDay, nowISO, startOfDay };
