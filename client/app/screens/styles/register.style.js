import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  linearGradient: {
    flex: 1,
    justifyContent: "flex-start", // Sử dụng 'flex-start' thay vì 'top'
    width: "100%",
  },

  iconContainer: {
    position: "absolute",
    right: 16,
    top: 14,
  },

  headerText: {
    fontFamily: "rufner",
    fontSize: SIZES.xxLarge,
    color: COLORS.exerciseBg,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    borderRadius: 12,
    width: SIZES.width - SIZES.xxLarge * 5,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "rufner",
    fontSize: SIZES.large,
    color: COLORS.black,
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

  ipfTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    fontFamily: "poppinsRegular",
    color: "white",
  },

  smallText: {
    fontFamily: "sfProHeavyItalic",
    color: COLORS.btn,
  },

  linkText: {
    fontFamily: "sfProHeavyItalic",
    color: COLORS.exerciseBg,
  },

  forgotPassText: {
    fontFamily: "sfProHeavyItalic",
    color: COLORS.exerciseBg,
  },

  textContainer: {
    justifyContent: "center",
    height: 60,
    flexDirection: "row",
    gap: 32,
  },

  errorText: {
    marginTop: SIZES.small,
    fontFamily: "sfProHeavy",
    fontSize: SIZES.medium,
    color: "red",
    alignSelf: "flex-start",
  },
});

const styles2 = StyleSheet.create({
  btnContainer: (backgroundColor) => ({
    backgroundColor: COLORS.exerciseBg,
    borderRadius: 12,
    width: SIZES.width - SIZES.xxLarge * 4,
    height: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  }),

  btnLabel: {
    fontFamily: "sfProHeavyItalic",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});

const googleButton = StyleSheet.create({
  btnContainer: {
    borderRadius: 30,
    fontSize: SIZES.Lg,
    backgroundColor: COLORS.btn,
  },
});
export { styles1, styles2, googleButton };
