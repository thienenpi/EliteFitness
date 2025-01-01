import { Button, StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    backgroundColor: COLORS.primaryBg,
  },

  shopContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  headerContainer: {
    top: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    gap: 12,
    marginTop: 56,
    justifyContent: "space-between",
  },

  sideIcon: {
    height: 14.92,
    width: 31,
  },

  productName: {
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    fontSize: TEXTS.bodySmall.fontSize,
    color: COLORS.secondary500,
  },

  productPrice: {
    fontFamily: TEXTS.price.fontFamily,
    fontSize: TEXTS.price.fontSize,
    color: COLORS.primary,
    marginTop: 8,
  },

  ratingContainer: {
    flexDirection: "row",
    gap: 12,
  },

  ratingLevel: {
    fontFamily: TEXTS.bodySmall.fontFamily,
    fontSize: TEXTS.bodySmall.fontSize,
    color: COLORS.primary,
  },
  quantitySold: {
    fontFamily: TEXTS.bodySmall.fontFamily,
    fontSize: TEXTS.bodySmall.fontSize,
    color: COLORS.neutral700,
  },
  description: {
    fontFamily: TEXTS.bodySmall.fontFamily,
    fontSize: TEXTS.bodySmall.fontSize,
    color: COLORS.neutral800,
    marginVertical: 12,
  },

  btnContainer: (backgroundColor) => ({
    height: 40,
    // marginVertical: 10,
    // marginHorizontal: SIZES.xxLarge * 2,
    width: "40%",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    flexDirection: "row-reverse",
    gap: 8,
    position: "absolute",
    right: 12,
    bottom: 12,
  }),
  btnLabel: {
    fontFamily: TEXTS.captionHeavy.fontFamily,
    color: COLORS.neutral100,
    fontSize: TEXTS.caption.fontSize,
  },
});

export default styles;
