import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  cartItemContainer: {
    height: 112,
    alignContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.text,
    padding: 8,
    borderRadius: 12,
  },

  checkBox: {
    justifyContent: "center",
    alignContent: "center",
  },

  productInfoContainer: {
    gap: 4,
    paddingVertical: 4,
  },

  productName: {
    color: COLORS.primary,
    fontSize: TEXTS.bodyHeavy.fontSize,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
  },

  productCategory: {
    color: COLORS.text,
    fontSize: TEXTS.bodySmall.fontSize,
    fontFamily: TEXTS.bodySmall.fontFamily,
  },

  productPriceContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: SIZES.xxLarge * 6,
  },

  productPrice: {
    color: COLORS.secondary,
    marginTop: 4,
    fontSize: TEXTS.price.fontSize,
    fontFamily: TEXTS.price.fontFamily,
  },

  quantityContainer: {
    flexDirection: "row",
    gap: 12,
    alignContent: "center",
    borderColor: COLORS.text,
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "space-between",
  },

  quantityBtn: {
    color: COLORS.primary,
    fontSize: TEXTS.bodyHeavy.fontSize,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
  },

  quantity: {
    color: COLORS.text,
    fontSize: TEXTS.bodySmall.fontSize,
    fontFamily: TEXTS.bodySmall.fontFamily,
    alignSelf: "center",
  },

  productImage: {
    margin: SIZES.small,
    alignSelf: "center",
    width: SIZES.xxLarge * 2,
    height: SIZES.xxLarge * 2,
    borderRadius: 8,
  },
});

export default styles;
