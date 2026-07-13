import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";

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
  onBlur,
  onChange,
  options,
  style,
  value,
}: SelectProps<T>): React.JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  const mappedOptions = options.map(mapOption) as Option<T extends object ? T["value"] : T>[];
  const selection =
    value === undefined ? undefined : mappedOptions.find((el) => el.value === value);

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
        {mappedOptions.map((option, idx) => {
          const selected = selection?.value === option.value;
          const handlePress = (): void => {
            if (!selected) {
              onChange?.(option.value, idx);
            }
            handleClose();
          };

          return (
            <Button color={selected ? "primary" : "text"} key={option.value} onPress={handlePress}>
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
