import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 4,
  },
  toast: {
    alignItems: "center",
    bottom: 80,
    flexDirection: "column",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 9999,
  },
});

export { styles };
