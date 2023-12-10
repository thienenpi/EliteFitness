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
    alignItems: "center",
  },

  headerText: {
    fontFamily: "rufner",
    color: COLORS.btn,
    fontSize: SIZES.large,
  },

  convo: {},

  botAvatar: {
    height: 40,
    width: 40,
  },

  inputWrapper: {
    flexDirection: 'row',
    height: 50,
    borderRadius: SIZES.large,
    borderColor: COLORS.btn,
    borderWidth: 1,
    padding: 10,
    marginBottom: SIZES.xxLarge,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputText: {
    color: COLORS.text,
    width: 280
  },

  sendIcon: {
    color: COLORS.btn,
  },

  bubble: {
    backgroundColor: COLORS.exerciseBg,
    borderRadius: 10,
    padding: 10,
    maxWidth: 250,
  },

  separator: {
    height: SIZES.medium
  }
})

export default styles
