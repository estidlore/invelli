import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toast: {
    alignItems: "center",
    bottom: 80,
    display: "flex",
    flexDirection: "column",
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 9999,
  },
});

export { styles };
