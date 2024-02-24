import { Platform, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const IS_IOS = Platform.OS == "ios"

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginHorizontal: SIZES.xSmall,
    top: IS_IOS ? 0 : 50,
    backgroundColor: COLORS.accept,
    alignItems: "center",
  },

  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default styles
