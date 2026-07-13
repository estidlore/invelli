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

export { NUM_FORMATS };
