import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  columnLeft: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  columnRight: {
    alignItems: "flex-end",
    flexDirection: "column",
    gap: 8,
  },
  container: {
    alignItems: "flex-start",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 16,
    paddingBottom: 8,
  },
});

export { styles };
