import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  grid: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    flexGrow: 1,
    minWidth: "40%",
  },
});

export { styles };
