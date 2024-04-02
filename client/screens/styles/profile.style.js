import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    flexDirection: "column",
    backgroundColor: COLORS.primaryBg,
  },
  guideContainer: {
    paddingTop: 80,
    height: SIZES.xxLarge,
    marginHorizontal: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  sideIcon: {
    height: 40,
    width: 40,
  },

  guideTxt: {
    fontFamily: "rufner",
    fontSize: 13,
    color: COLORS.text,
    marginHorizontal: SIZES.xSmall,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 99,
    width: SIZES.width - SIZES.xxLarge * 4,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  }),

  btnLabel: {
    fontFamily: "rufner",
    fontSize: SIZES.large,
    color: COLORS.black,
  },
});

export default styles;
