import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryBg,
  },
  headerText: {
    fontFamily: "rufner",
    fontSize: SIZES.xLarge,
    paddingVertical: SIZES.xLarge,
    color: COLORS.primary,
  },

  ipfContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - SIZES.xxLarge * 2,
    borderRadius: SIZES.medium,
    borderColor: "#D5D1CA",
    borderWidth: 1,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 12,
    width: SIZES.width - SIZES.xxLarge * 5,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  }),

  countryPickerContainer: {},
});

export default styles;
