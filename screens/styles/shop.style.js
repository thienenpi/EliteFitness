import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    backgroundColor: COLORS.primaryBg,
  },

  shopContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    flexDirection: "row",
  },

  sideIcon: {
    height: 14.92,
    width: 31,
  },

  guideTxt: {
    fontFamily: "rufner",
    fontSize: 13,
    color: COLORS.text,
    marginHorizontal: SIZES.xSmall,
  },

  muscleContainer: {
    marginHorizontal: SIZES.xxLarge,
    marginVertical: 12,
  },

  muscleHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "sfProBlackItalic",
    color: COLORS.btn,
    fontSize: SIZES.medium,
  },

  exerciseContainer: {
    marginHorizontal: SIZES.xxLarge,
    height: SIZES.height * 0.5,
  },

  exerciseHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Slider
  sliderContainer: {
    paddingHorizontal: 40,
  },
});

export default styles;
