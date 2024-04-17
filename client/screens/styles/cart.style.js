import { StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    backgroundColor: COLORS.primaryBg,
  },

  sideIcon: {
    height: 14.92,
    width: 31,
  },

  headerBar: {
    flexDirection: "row",
    marginTop: 56,
    justifyContent: "space-between",
    marginHorizontal: 16,
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: COLORS.neutral400,
  },

  headerText: {
    fontSize: TEXTS.bodyHeavy.fontSize,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    color: COLORS.primary,
  },
});

export default styles;
