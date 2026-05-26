import { TextInput, View } from "react-native";

import { Alert } from "@/components/Alert";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { InputProps } from "./types";

const Input = ({
  maxLength,
  meta,
  onBlur,
  onChange,
  placeholder,
  type = "default",
  secure = false,
  style,
  value,
}: InputProps): React.JSX.Element => {
  const showAlert = meta?.touched && meta.error !== undefined;
  const colors = useColors();

  return (
    <View
      style={[styles.container, { borderColor: showAlert ? colors.bgError : colors.bg3 }, style]}
    >
      <TextInput
        keyboardType={type}
        maxLength={maxLength}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={`${colors.text}cc`}
        secureTextEntry={secure}
        style={[styles.input, { backgroundColor: colors.bg2, color: colors.text }]}
        value={value}
      />
      <Alert hide={!showAlert} style={styles.alert} type={"error"}>
        {meta?.error}
      </Alert>
    </View>
  );
};

export { Input };
