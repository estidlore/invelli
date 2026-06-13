import type { StyleProp, ViewStyle } from "react-native";

type AlertType = "error" | "success" | "warning";

interface AlertProps {
  children: React.ReactNode;
  hide?: boolean;
  style?: StyleProp<ViewStyle>;
  type: AlertType;
}

export type { AlertProps, AlertType };
