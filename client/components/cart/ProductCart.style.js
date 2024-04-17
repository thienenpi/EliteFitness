import { StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  cartItemContainer: {
    height: 96,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.text,
    padding: 8,
    borderRadius: 12,
  },
});

export default styles;
