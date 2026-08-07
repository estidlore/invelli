import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  center: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
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
    flex: 1,
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  itemsCenter: {
    alignItems: "center",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyEvenly: {
    justifyContent: "space-evenly",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  listContent: {
    gap: 8,
    paddingBottom: 80,
  },
  mb: {
    marginBottom: 8,
  },
  mb2: {
    marginBottom: 16,
  },
  mt: {
    marginTop: 8,
  },
  my: {
    marginVertical: 8,
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  rowBetween: {
    alignItems: "center",
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
