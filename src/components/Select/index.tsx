import { useReducer } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { Option, SelectOption, SelectProps } from "./types";

const mapOption = <T extends number | string>(option: Option<T> | T): Option<T> => {
  if (typeof option === "object") {
    return option;
  }
  return { text: option.toString(), value: option };
};

const Select = <T extends SelectOption>({
  label,
  onChange,
  options,
  style,
  value,
}: SelectProps<T>): React.JSX.Element => {
  const [showOptions, toggleShowOptions] = useReducer((val) => !val, false);

  const mappedOptions = options.map(mapOption) as Option<T extends object ? T["value"] : T>[];
  const selection =
    value === undefined ? undefined : mappedOptions.find((el) => el.value === value);

  const colors = useColors();

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Button icon={"chevronDown"} onPress={toggleShowOptions}>
        {selection?.text ?? "-"}
      </Button>
      <Modal onClose={toggleShowOptions} title={label} visible={showOptions}>
        {mappedOptions.map((option, idx) => {
          const selected = selection?.value === option.value;
          const handlePress = (): void => {
            toggleShowOptions();
            if (!selected) {
              onChange?.(option.value, idx);
            }
          };

          return (
            <Button
              key={option.value}
              onPress={handlePress}
              style={[styles.option, { backgroundColor: selected ? colors.card : undefined }]}
            >
              {option.text}
            </Button>
          );
        })}
      </Modal>
    </View>
  );
};

export { Select };
