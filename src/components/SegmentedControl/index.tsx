import { View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { SegmentedControlProps } from "./types";

const SegmentedControl = <T extends number | string>({
  activeOptions = { color: "primary" },
  inactiveOptions = {},
  label,
  onChange,
  options,
  value,
  ...restProps
}: SegmentedControlProps<T>): React.JSX.Element => {
  const colors = useColors();

  return (
    <View {...restProps}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {options.map((option) => {
          const selected = option.value === value;
          const btnOptions = selected ? activeOptions : inactiveOptions;

          return (
            <Button
              color={btnOptions.color}
              disabled={selected}
              icon={option.icon}
              key={option.value}
              onPress={(): void => {
                onChange(option.value);
              }}
              style={styles.btn}
              variant={btnOptions.variant}
            >
              {option.text}
            </Button>
          );
        })}
      </View>
    </View>
  );
};

export type * from "./types";
export { SegmentedControl };
