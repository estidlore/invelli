const colors = {
  dark: "#17191c",
  gray: "#737b8c",
  grayDark: "#454a54",
  grayLight: "#abb0ba",
  light: "#e3e5e8",
  transparent: "transparent"
};

type ColorName = keyof typeof colors;

export type { ColorName };
export { colors };
