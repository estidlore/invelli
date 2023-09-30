const colors = {
  dark: "#17191c",
  gray: "#737b8c",
  grayDark: "#454a54",
  grayLight: "#abb0ba",
  green: "#1fad1f",
  light: "#e3e5e8",
  red: "#ad1f1f",
  transparent: "transparent",
  yellow: "#adad1f",
};

type ColorName = keyof typeof colors;

export type { ColorName };
export { colors };
