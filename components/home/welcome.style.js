import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.secondary,
    marginHorizontal: SIZES.xxLarge,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 52,
  },

  profileImage: {
    height: 52,
    width: 52,
    borderRadius: 999,
  },

  welcomeContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: 52,
    justifyContent: 'space-evenly'
  },

  welcomeTxt: {
    fontFamily: "rufner",
    color: COLORS.text,
    fontSize: 13,
  },

  userName: {
    fontFamily: "rufner",
    fontSize: SIZES.xLarge,
  },

  settingIcon: {
    marginHorizontal: SIZES.large,
    height: 24,
    width: 24,
  },
})

export default styles
