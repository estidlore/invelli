import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  codeRow: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    marginVertical: 8,
  },
});

export { styles };
