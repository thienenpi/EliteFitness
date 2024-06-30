import { Platform, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const IS_IOS = Platform.OS === "ios"

const CAM_PREVIEW_WIDTH = SIZES.width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const styles = StyleSheet.create({
  containerPortrait: {
    position: "relative",
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
  },

  containerLandscape: {
    position: "relative",
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH,
  },

  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.exerciseBg,
  },

  btn: (backgroundColor) => ({
    height: 36,
    marginTop: SIZES.large,
    marginHorizontal: SIZES.width * 0.35,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.large,
  }),

  btnText: {
    fontFamily: 'sfProBlackItalic',
    color: COLORS.white,
    fontSize: SIZES.small,
    marginHorizontal: SIZES.large
  },
})

export default styles
