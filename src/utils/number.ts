const NUM_FORMATS = {
  FORM_PRICE: new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    useGrouping: false,
  }),
  FORM_QUANTITY: new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
    useGrouping: false,
  }),
  PERCENT: new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "percent",
  }),
  PRICE: new Intl.NumberFormat(undefined, {
    currency: "USD",
    minimumFractionDigits: 0,
    style: "currency",
  }),
  QUANTITY: new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  }),
};

const clamp = (n: number, min?: number, max?: number): number => {
  let res = n;
  if (max !== undefined) {
    res = Math.min(res, max);
  }
  if (min !== undefined) {
    res = Math.max(res, min);
  }
  return res;
};

export { NUM_FORMATS, clamp };
