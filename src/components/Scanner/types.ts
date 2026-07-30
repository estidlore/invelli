import type { ViewProps } from "react-native";

interface ScannerProps extends Pick<ViewProps, "children" | "style"> {
  onScan: (code: string) => void;
}

export type { ScannerProps };
