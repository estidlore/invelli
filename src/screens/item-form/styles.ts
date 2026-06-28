import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    marginVertical: 8,
  },
  skuRow: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: 8,
  },
});

export { styles };
