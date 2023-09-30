import type { StyleProp, TextStyle } from "react-native";

type AlertType = "error" | "success" | "warning";

interface AlertProps {
  children: React.ReactNode;
  hide?: boolean;
  style?: StyleProp<TextStyle>;
  type: AlertType;
}

export type { AlertProps, AlertType };
