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
  container: {
    borderRadius: 4,
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export { styles };
