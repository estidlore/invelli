type ThemeName = "dark" | "light";

type Theme = Record<
  | "bg"
  | "bg2"
  | "bg3"
  | "bgDisabled"
  | "primary"
  | "primaryActive"
  | "primaryHover"
  | "text"
  | "text2"
  | "textDisabled",
  string
>;

const COLORS: Record<ThemeName, Theme> = {
  dark: {
    bg: "#0b0c0e",
    bg2: "#17191c",
    bg3: "#22252a",
    bgDisabled: "#2e3138",
    primary: "#cc7f66",
    primaryActive: "#e6bfb3",
    primaryHover: "#d99f8c",
    text: "#e3e5e8",
    text2: "#abb0ba",
    textDisabled: "#737b8c",
  },
  light: {
    bg: "#f1f2f4",
    bg2: "#e3e5e8",
    bg3: "#d5d7dd",
    bgDisabled: "#c7cad1",
    primary: "#df5020",
    primaryActive: "#863013",
    primaryHover: "#b34019",
    text: "#17191c",
    text2: "#454a54",
    textDisabled: "#737b8c",
  },
};

export type { Theme, ThemeName };
export { COLORS };
