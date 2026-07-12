const nullableText = (str: string | null): string | null => {
  return typeof str === "string" && str.length > 0 ? str : null;
};

export { nullableText };
