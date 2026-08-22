import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";

import { styles } from "./styles";
import type { SelectProps } from "./types";

const Select = <T extends number | string>({
  label,
  onBlur,
  onChange,
  options,
  style,
  value,
}: SelectProps<T>): React.JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  const selection = value === undefined ? undefined : options.find((el) => el.value === value);

  const handleOpen = (): void => {
    setShowOptions(true);
  };

  const handleClose = (): void => {
    setShowOptions(false);
    onBlur?.();
  };

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Button icon={"chevronDown"} onPress={handleOpen} variant={"outline"}>
        {selection?.text ?? "-"}
      </Button>
      <Modal onClose={handleClose} title={label} visible={showOptions}>
        {options.map((option, idx) => {
          const selected = option.value === value;
          const handlePress = (): void => {
            if (!selected) {
              onChange?.(option.value, idx);
            }
            setShowOptions(false);
            onBlur?.(option.value);
          };

          return (
            <Button
              color={selected ? "primary" : "text"}
              disabled={selected}
              key={option.value}
              onPress={handlePress}
            >
              {option.text}
            </Button>
          );
        })}
      </Modal>
    </View>
  );
};

export type * from "./types";
export { Select };
