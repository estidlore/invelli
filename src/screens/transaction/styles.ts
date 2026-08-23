import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  businessInfo: {
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
  },
  total: {
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
    marginTop: 24,
    paddingBottom: 8,
  },
  txInfo: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  txInfoValues: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
});

export { styles };
