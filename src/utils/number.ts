const formatter = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

const formatCurrency = (value: number): string => {
  return formatter.format(value);
};

export { formatCurrency };
