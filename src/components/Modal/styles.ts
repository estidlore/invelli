import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 8,
    width: "100%",
  },
  title: {
    flexShrink: 1,
  },
});

export { styles };
