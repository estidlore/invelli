import type { ViewProps } from "react-native";

import type { ButtonProps } from "@/components/Button";
import type { IconName } from "@/components/Icon";

type ButtonOptions = Pick<ButtonProps, "color" | "variant">;

interface SegmentedControlOption<T extends number | string> {
  icon?: IconName;
  text?: string;
  value: T;
}

interface SegmentedControlProps<T extends number | string> extends ViewProps {
  activeOptions?: ButtonOptions;
  inactiveOptions?: ButtonOptions;
  label?: string;
  onChange: (value: T) => void;
  options: SegmentedControlOption<T>[];
  value: T;
}

export type { SegmentedControlOption, SegmentedControlProps };
