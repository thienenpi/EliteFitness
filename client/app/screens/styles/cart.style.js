import { StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    backgroundColor: COLORS.primaryBg,
  },

  sideIcon: {
    height: 14.92,
    width: 31,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    marginTop: 56,
    justifyContent: "space-between",
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral400,
  },

  headerText: {
    fontSize: TEXTS.bodyHeavy.fontSize,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    color: COLORS.primary,
  },
});

export default styles;
