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

const dateToString = (date: Date): string => {
  const map = dateToMap(date);
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
};

const dateToFileName = (date: Date): string => {
  const map = dateToMap(date);
  return `${map.year}-${map.month}-${map.day}_${map.hour}-${map.minute}-${map.second}`;
};

const logError = (...error: unknown[]): void => {
  console.error(...error);
};

const nowISO = (): string => new Date().toISOString();

export { dateToFileName, dateToString, logError, nowISO };
