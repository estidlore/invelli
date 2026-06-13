type ThemeName = "dark" | "light";
type ThemeColors =
  | "background"
  | "bgDisabled"
  | "bgError"
  | "bgSuccess"
  | "bgWarning"
  | "border"
  | "card"
  | "primary"
  | "primaryActive"
  | "primaryHover"
  | "text"
  | "text2"
  | "textDisabled"
  | "textError"
  | "textSuccess"
  | "textWarning";

type Theme = Record<ThemeColors, string>;

const COLORS: Record<ThemeName, Theme> = {
  dark: {
    background: "#0b0c0e", // hsl(220, 10%, 5%)
    bgDisabled: "#2e3138", // hsl(220, 10%, 20%)
    bgError: "#2d0606", // hsl(0, 75%, 10%)
    bgSuccess: "#062d06", // hsl(120, 75%, 10%)
    bgWarning: "#2d2d06", // hsl(60, 75%, 10%)
    border: "#22252a", // hsl(220, 10%, 15%)
    card: "#17191c", // hsl(220, 10%, 10%)
    primary: "#e6734c", // hsl(15, 75%, 60%)
    primaryActive: "#f2b9a6", // hsl(15, 75%, 80%)
    primaryHover: "#ec9679", // hsl(15, 75%, 70%)
    text: "#e3e5e8", // hsl(220, 10%, 90%)
    text2: "#abb0ba", // hsl(220, 10%, 70%)
    textDisabled: "#737b8c", // hsl(220, 10%, 50%)
    textError: "#f2a6a6", // hsl(0, 75%, 80%)
    textSuccess: "#a6f2a6", // hsl(120, 75%, 80%)
    textWarning: "#f2f2a6", // hsl(60, 75%, 80%)
  },
  light: {
    background: "#f1f2f4", // hsl(220, 10%, 95%)
    bgDisabled: "#c7cad1", // hsl(220, 10%, 80%)
    bgError: "#f9d2d2", // hsl(0, 75%, 90%)
    bgSuccess: "#d2f9d2", // hsl(120, 75%, 90%)
    bgWarning: "#f9f9d2", // hsl(60, 75%, 90%)
    border: "#d5d7dd", // hsl(220, 10%, 85%)
    card: "#e3e5e8", // hsl(220, 10%, 90%)
    primary: "#b34019", // hsl(15, 75%, 40%)
    primaryActive: "#59200d", // hsl(15, 75%, 20%)
    primaryHover: "#863013", // hsl(15, 75%, 30%)
    text: "#17191c", // hsl(220, 10%, 10%)
    text2: "#454a54", // hsl(220, 10%, 30%)
    textDisabled: "#737b8c", // hsl(220, 10%, 50%)
    textError: "#590d0d", // hsl(0, 75%, 20%)
    textSuccess: "#0d590d", // hsl(120, 75%, 20%)
    textWarning: "#59590d", // hsl(60, 75%, 20%)
  },
};

export type { Theme, ThemeColors, ThemeName };
export { COLORS };
