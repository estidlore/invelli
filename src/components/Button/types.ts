import type { TouchableOpacityProps } from "react-native";

import type { IconName } from "@/components/Icon";

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  icon?: IconName;
}

export type { ButtonProps };
