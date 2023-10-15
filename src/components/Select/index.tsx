import React, { useReducer, useState } from "react";
import { View } from "react-native";

import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { colors } from "utils/colors";

import { styles } from "./styles";
import type { Option, SelectOption, SelectProps } from "./types";

const mapOption = <T extends number | string>(
  option: Option<T> | T,
): Option<T> => {
  if (typeof option === "object") {
    return option;
  }
  return { text: option.toString(), value: option };
};

const Select = <T extends SelectOption>({
  label,
  onChange,
  options,
}: SelectProps<T>): JSX.Element => {
  const [selection, setSelection] = useState(options[0]);
  const [showOptions, toggleShowOptions] = useReducer((val) => !val, false);

  const mappedSelection = mapOption(selection);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Button icon={"chevron-down"} onPress={toggleShowOptions}>
        {mappedSelection.text}
      </Button>
      <Modal onClose={toggleShowOptions} title={label} visible={showOptions}>
        {options.map((option) => {
          const handlePress = (): void => {
            setSelection(option);
            toggleShowOptions();
            onChange?.(option);
          };
          const selected = selection === option;
          const mappedOption = mapOption(option);

          return (
            <Button
              key={mappedOption.value}
              onPress={handlePress}
              style={[
                styles.option,
                { backgroundColor: selected ? colors.grayDark : undefined },
              ]}
            >
              {mappedOption.text}
            </Button>
          );
        })}
      </Modal>
    </View>
  );
};

export { Select };
