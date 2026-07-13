import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  alert: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 14,
  },
  alertWrapper: {
    position: "relative",
  },
  box: {
    borderRadius: 4,
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  inputRow: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  label: {
    marginBottom: 4,
  },
});

export { styles };
