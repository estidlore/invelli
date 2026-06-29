import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  center: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  floatingBtn: {
    borderRadius: "50%",
    bottom: 16,
    height: 64,
    position: "absolute",
    right: 16,
    width: 64,
  },
  grow: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  listContent: {
    gap: 8,
    paddingBottom: 80,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
});

export { commonStyles };
