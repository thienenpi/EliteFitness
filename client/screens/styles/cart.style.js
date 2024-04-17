import { StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },

  sideIcon: {
    height: 14.92,
    width: 31,
  },

  headerBar: {
    flexDirection: "row",
    flex: 1,
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

  body: {
    flexDirection: "column",
    flex: 9,
    marginHorizontal: SIZES.small,
  },

  productItems: {
    flex: 8,
  },

  footerBar: {
    flex: 2,
    justifyContent: "center"
  },  

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 12,
    width: SIZES.width - SIZES.xxLarge * 5,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  }),

});

export default styles;
