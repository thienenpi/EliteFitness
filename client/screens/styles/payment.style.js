import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryBg
  },

  productList: {
    flex: 1,
    rowGap: SIZES.small,
    top: SIZES.xxLarge * 2,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: SIZES.small,
    width: SIZES.width - SIZES.xxLarge * 5,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    bottom: SIZES.xxLarge * 2,
    left: SIZES.xxLarge * 2,
  }),
});

export default styles;
