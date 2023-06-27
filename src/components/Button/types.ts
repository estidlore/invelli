import type { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  icon?: string;
}

export type { ButtonProps };
