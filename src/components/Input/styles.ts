import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  alert: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 14,
  },
  alertWrapper: {
    position: "relative",
  },
  container: {
    borderColor: colors.light,
    borderRadius: 4,
    borderWidth: 1,
    overflow: "hidden",
  },
  error: {
    borderColor: colors.red,
  },
  input: {
    color: colors.light,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export { styles };
