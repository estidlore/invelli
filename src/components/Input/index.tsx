import { TextInput, View } from "react-native";

import { Alert } from "@/components/Alert";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { InputProps } from "./types";

const Input = ({
  label,
  maxLength,
  meta,
  onBlur,
  onChange,
  placeholder,
  secure = false,
  style,
  type = "default",
  value,
}: InputProps): React.JSX.Element => {
  const showAlert = meta?.touched && meta.error !== undefined;
  const colors = useColors();

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label} type={"small"}>
          {label}
        </Text>
      )}
      <View style={[styles.box, { borderColor: showAlert ? colors.bgError : colors.border }]}>
        <TextInput
          accessibilityLabel={label}
          keyboardType={type}
          maxLength={maxLength}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={`${colors.text}cc`}
          secureTextEntry={secure}
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          value={value}
        />
        <Alert hide={!showAlert} style={styles.alert} type={"error"}>
          {meta?.error}
        </Alert>
      </View>
    </View>
  );
};

export type * from "./types";
export { Input };
