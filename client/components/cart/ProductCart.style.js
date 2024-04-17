import { StyleSheet } from "react-native";
import { SIZES, COLORS, TEXTS } from "../../constants";
import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
  cartItemContainer: {
    paddingHorizontal: 12,
    height: 112,
    alignContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.text,
    padding: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  CheckBox:{
    justifyContent:"center",
    alignContent:"center",
  },

  productInfoContainer:{
    gap: 4,
    paddingVertical: 4,
  },
  productName:{
    color: COLORS.primary,
    fontSize: TEXTS.bodyHeavy.fontSize,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
  },
  productCategory:{
    color: COLORS.text,
    fontSize: TEXTS.bodySmall.fontSize,
    fontFamily: TEXTS.bodySmall.fontFamily,
  },
  productPriceContainer:{
    flexDirection: "row",
    width: "80%",
    alignContent: "center",
    justifyContent: "space-between",
},
  productPrice:{
    color: COLORS.secondary,
    marginTop: 4,
    fontSize: TEXTS.price.fontSize,
    fontFamily: TEXTS.price.fontFamily,
  },quantityContainer:{
    flexDirection: "row",
    gap: 12,
    alignContent: "center",
    borderColor: COLORS.text,
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent:"space-between"
  },
    quantityBtn:{
        color: COLORS.primary,
        fontSize: TEXTS.bodyHeavy.fontSize,
        fontFamily: TEXTS.bodyHeavy.fontFamily,
    },
    quantity:{
        color: COLORS.text,
        fontSize: TEXTS.bodySmall.fontSize,
        fontFamily: TEXTS.bodySmall.fontFamily,
        alignSelf: "center",
    },
    productImage:{
        width: 96,
        height: 96,
        borderRadius: 8,
    }
});

export default styles;
