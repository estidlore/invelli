import { StyleSheet } from "react-native";

import { colors } from "utils/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    borderRadius: 4,
    maxHeight: "100%",
    padding: 16,
    width: "100%",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modal: {
    alignItems: "center",
    backgroundColor: `${colors.gray}88`,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 8,
    width: "100%",
  },
  title: {
    color: colors.light,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export { styles };
