import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  alert: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: "100%",
  },
  box: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  label: {
    marginBottom: 4,
  },
});

export { styles };
