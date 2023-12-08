import { Platform, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const IS_IOS = Platform.OS === "ios"

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryBg,
    flex: 1,
  },

  header: {
    alignItems: 'center',
  },

  headerText: {
    fontFamily: 'rufner',
    color: COLORS.btn,
    fontSize: SIZES.medium
  },

  convo: {
  },

  inputWrapper: {
    height: 50,
    borderRadius: SIZES.small,
    borderColor: COLORS.btn,
    borderWidth: 1,
  }
})

export default styles
