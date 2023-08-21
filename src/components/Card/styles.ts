import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  container: {
    borderColor: colors.light,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12
  },
  hr: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginVertical: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export { styles };
