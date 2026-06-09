import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addItem: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  searchError: {
    textAlign: "center",
  },
  searchInput: {
    flexGrow: 1,
  },
});

export { styles };
