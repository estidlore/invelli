const logError = (...error: unknown[]): void => {
  console.error(...error);
};

export * from "./date";
export * from "./number";
export * from "./string";
export { logError };
