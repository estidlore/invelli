const nullableText = (str: string): string | null => {
  return str.length === 0 ? null : str;
};

export { nullableText };
