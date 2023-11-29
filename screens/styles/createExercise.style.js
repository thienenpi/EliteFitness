import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 1.5,
    backgroundColor: COLORS.primaryBg,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.xxLarge,
  },

  headerText: {
    fontFamily: "sfProBlackItalic",
    fontSize: SIZES.xLarge,
    color: COLORS.btn,
    alignSelf: "center",
  },

  bodyContainer: {
    backgroundColor: COLORS.exerciseBg,
    marginVertical: SIZES.xLarge,
    marginHorizontal: SIZES.xxLarge,
  },

  wrapper: {
    marginBottom: 20,
  },

  label: {
    fontSize: SIZES.small,
    color: COLORS.btn,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
  },

  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),

  btn: (backgroundColor) => ({
    height: 48,
    width: 200,
    marginVertical: 20,
    backgroundColor: backgroundColor,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: SIZES.xLarge,
  }),

  btnText: {
    fontFamily: "sfProBlackItalic",
    fontSize: 16,
  },

  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },

  iconStyle: {
    marginRight: 10,
    color: COLORS.btn,
  },
})

export default styles
