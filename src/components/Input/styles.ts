import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  input: {
    borderColor: colors.light,
    borderRadius: 4,
    borderWidth: 1,
    color: colors.light,
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4
  }
});

export { styles };
