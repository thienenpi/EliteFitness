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

  btnContainer: (borderColor) => ({
    height: 40,
    width: "32%",
    borderColor: COLORS.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    gap: 8,
    position: "absolute",
    right: 24,
    bottom: 24,
  }),
  
  btnLabel: {
    fontFamily: TEXTS.captionHeavy.fontFamily,
    fontSize: TEXTS.caption.fontSize,
    color: COLORS.primary,

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
