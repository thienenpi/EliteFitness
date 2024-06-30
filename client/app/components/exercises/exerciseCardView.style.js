import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.exerciseBg,
    height: 86,
    borderRadius: 6,
    marginVertical: SIZES.xSmall,
    flexDirection: "row",
    paddingHorizontal: SIZES.xSmall,
  },

  image: {
    overflow: "hidden",
    borderRadius: SIZES.xSmall,
    // overlayColor: COLORS.text,
    width: 68,
    height: 70,
    alignSelf: "center",
  },

  details: {
    width: SIZES.width - 250,
    marginHorizontal: SIZES.large,
    marginTop: SIZES.xSmall,
    alignItems: "flex-start",
    flexDirection: "column",
  },

  title: {
    fontFamily: "sfProBlackItalic",
    fontSize: SIZES.small,
    color: COLORS.btn,
  },

  setAndRep: {
    marginTop: SIZES.xSmall,
    fontFamily: "sfProBlackItalic",
    fontSize: SIZES.xSmall,
    color: COLORS.text,
  },

  description: {
    fontFamily: "sfPro",
    fontSize: SIZES.xSmall,
    color: COLORS.text,
  },

  btnColumn: {
    marginVertical: SIZES.xSmall,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  btn: {
    height: 24,
    width: 24,
  },
});

export default styles;
