import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 30,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
  },
  error: {
    backgroundColor: colors.red,
  },
  success: {
    backgroundColor: colors.green,
  },
  text: {
    marginLeft: 8,
  },
  warning: {
    backgroundColor: colors.yellow,
  },
  wrapper: {
    borderRadius: 4,
    position: "relative",
  },
});

export { styles };
