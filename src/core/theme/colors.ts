type ThemeName = "dark" | "light";
type ThemeColors =
  | "bg"
  | "bg2"
  | "bg3"
  | "bgDisabled"
  | "primary"
  | "primaryActive"
  | "primaryHover"
  | "text"
  | "text2"
  | "textDisabled";

type Theme = Record<ThemeColors, string>;

const COLORS: Record<ThemeName, Theme> = {
  dark: {
    bg: "#0b0c0e", // hsl(220, 10%, 5%)
    bg2: "#17191c", // hsl(220, 10%, 10%)
    bg3: "#22252a", // hsl(220, 10%, 15%)
    bgDisabled: "#2e3138", // hsl(220, 10%, 20%)
    primary: "#e6734c", // hsl(15, 75%, 60%)
    primaryActive: "#f2b9a6", // hsl(15, 75%, 80%)
    primaryHover: "#ec9679", // hsl(15, 75%, 70%)
    text: "#e3e5e8", // hsl(220, 10%, 90%)
    text2: "#abb0ba", // hsl(220, 10%, 70%)
    textDisabled: "#737b8c", // hsl(220, 10%, 50%)
  },
  light: {
    bg: "#f1f2f4", // hsl(220, 10%, 95%)
    bg2: "#e3e5e8", // hsl(220, 10%, 90%)
    bg3: "#d5d7dd", // hsl(220, 10%, 85%)
    bgDisabled: "#c7cad1", // hsl(220, 10%, 80%)
    primary: "#b34019", // hsl(15, 75%, 40%)
    primaryActive: "#59200d", // hsl(15, 75%, 20%)
    primaryHover: "#863013", // hsl(15, 75%, 30%)
    text: "#17191c", // hsl(220, 10%, 10%)
    text2: "#454a54", // hsl(220, 10%, 30%)
    textDisabled: "#737b8c", // hsl(220, 10%, 50%)
  },
};

export type { Theme, ThemeColors, ThemeName };
export { COLORS };
