import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    // borderColor: COLORS.btn,
    // borderWidth: 2,
  },
  productContainer: {
    backgroundColor: COLORS.productBg,
    borderRadius: 8,
    width: "48%",
  },
  productImg: {
    width: 140,
    height: 140,
    marginTop: 6,
    alignSelf: "center",
  },
  productTitle: {
    textAlign: "center",
    paddingHorizontal: 2,
    fontFamily: "poppinsMedium",
    color: COLORS.text,
    fontSize: 13,
    marginVertical: 4,
  },
  productPrice: {
    textAlign: "center",
    paddingHorizontal: 6,
    fontFamily: "poppinsBold",
    color: COLORS.paragraphBg,
    fontSize: 14,
    marginBottom: 6,
  },
});

export default styles;
