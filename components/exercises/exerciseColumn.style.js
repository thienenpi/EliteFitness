import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xSmall,
  },

  guideTxt: {
    textAlign: "center",
    fontFamily: "rufner",
    fontSize: SIZES.small,
    color: COLORS.text,
    lineHeight: SIZES.large
  },
})

export default styles
