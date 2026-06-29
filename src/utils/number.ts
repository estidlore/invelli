const formatter = new Intl.NumberFormat(undefined, {
  currency: "USD",
  minimumFractionDigits: 0,
  style: "currency",
});

const formatCurrency = (value: number): string => {
  return formatter.format(value);
};

export { formatCurrency };
