import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  button: {
    marginEnd: 8
  },
  container: {
    marginVertical: 4
  },
  hr: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginVertical: 8
  },
  icon: {
    marginEnd: 8
  },
  key: {
    fontWeight: "bold",
    width: "50%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  value: {
    width: "50%"
  }
});

export { styles };
