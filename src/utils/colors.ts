const colors = {
  dark: "#0b0d0e",
  gray: "#73808c",
  light: "#f1f2f4",
  transparent: "transparent"
};

type ColorName = keyof typeof colors;

export type { ColorName };
export { colors };
