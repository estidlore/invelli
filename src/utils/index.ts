const logError = (...error: unknown[]): void => {
  console.warn(...error);
};

export * from "./date";
export * from "./number";
export * from "./string";
export * from "./transactions";
export { logError };
