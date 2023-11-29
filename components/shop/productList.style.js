import { StyleSheet } from "react-native"
import { SIZES, COLORS } from "../../constants"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },

  separator: {
    height: 16,
  },

  headerTxt: {
    fontFamily: "poppinsMedium",
    fontSize: 16,
    color: COLORS.paragraphBg,
    textTransform: "uppercase",
    textAlign: "center",
  },
})

export default styles
