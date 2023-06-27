import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.gray,
    borderRadius: 4,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 8
  },
  text: {
    marginHorizontal: 4
  }
});

export { styles };
