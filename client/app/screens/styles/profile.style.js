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
    borderRadius: 12,
    width: SIZES.width - SIZES.xxLarge * 6,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  }),

  btnLabel: {
    fontFamily: "rufner",
    fontSize: SIZES.medium * 0.9,
    color: COLORS.black,
  },
});

export default styles;
