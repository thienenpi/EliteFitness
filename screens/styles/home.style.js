import { StyleSheet } from "react-native"
import { SIZES, COLORS } from "../../constants"

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    height: SIZES.height,
    width: SIZES.width,
    flexDirection: "column",
    backgroundColor: COLORS.primaryBg,
  },

  muscleContainer: {
    marginHorizontal: SIZES.xxLarge,
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
})

export default styles
