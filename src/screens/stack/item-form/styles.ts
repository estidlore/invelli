import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    marginVertical: 8,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  loadingWrapper: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  save: {
    flexGrow: 1,
  },
});

export { styles };
