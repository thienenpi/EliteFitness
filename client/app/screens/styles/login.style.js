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
    alignItems: "center",
    justifyContent: "flex-start", // Sử dụng 'flex-start' thay vì 'top'
    paddingVertical: 120,
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
    color: "white",
    fontSize: SIZES.medium,
    fontFamily: "poppinsRegular",
  },

  smallText: {
    fontFamily: "sfProHeavyItalic",
    color: COLORS.btn,
  },

  forgotPassText: {
    fontFamily: "sfProHeavyItalic",
    color: COLORS.exerciseBg,
  },

  loader: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
