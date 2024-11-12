import { StyleSheet } from "react-native";
import { COLORS, TEXTS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  workoutContainer: {
    flex: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 12,
  },

  // Camera styles
  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Image styles
  selectedImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  // Button styles
  btnContainer: (backgroundColor) => ({
    padding: SIZES.small,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.medium,
  }),
  btnLabel: {
    fontFamily: "sfProBlackItalic",
    color: COLORS.neutral900,
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.large,
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: COLORS.neutral300,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 12,
    alignItems: "center",
  },
  countdownText: {
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    fontSize: TEXTS.heading3.fontSize,
    color: COLORS.secondary500,
  },
  bmiText: {
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    fontSize: TEXTS.buttonLarge.fontSize,
    color: COLORS.secondary500,
  },
});

export default styles;