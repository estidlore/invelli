import type { TouchableOpacityProps } from "react-native";

interface CardProps
  extends Pick<TouchableOpacityProps, "children" | "onPress" | "style"> {
  title: string;
}

export type { CardProps };
