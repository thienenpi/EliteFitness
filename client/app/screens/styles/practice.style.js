import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {},

  workoutContainer: {
    height: SIZES.height * 0.7
  },

  menuContainer: {
    height: SIZES.height * 0.3,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    paddingVertical: SIZES.small
  },

  detailsContainer: {
    backgroundColor: COLORS.exerciseBg,
    height: 80,
    borderRadius: 6,
    flexDirection: 'row',
    padding: SIZES.xSmall
  },

  trackContainer: {
    width: SIZES.width * 0.15
  },

  trackTitle: {
    fontFamily: 'rufner',
    fontSize: SIZES.xSmall,
    color: COLORS.text,
    marginBottom: 6
  },

  trackValue: {
    fontFamily: 'rufner',
    fontSize: SIZES.xSmall,
    marginBottom: 9
  },

  crtContainer: {
    width: SIZES.width * 0.5,
    alignItems: 'center'
  },

  crtTitle: {
    fontFamily: 'rufner',
    fontSize: SIZES.xSmall,
    color: COLORS.text,
    marginBottom: SIZES.xSmall
  },

  crtValue: (crtValueColor) => ({
    fontFamily: 'rufner',
    fontSize: SIZES.xSmall,
    color: crtValueColor
  }),

  btnContainer: (backgroundColor) => ({
    height: 36,
    marginVertical: 10,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.large,
    marginBottom: SIZES.small
  }),

  btnLabel: {
    fontFamily: 'sfProBlackItalic',
    color: COLORS.white,
    fontSize: SIZES.small,
    marginHorizontal: SIZES.large
  },

  settingContainer: {
    flexDirection: 'row',
    height: SIZES.xLarge * 1.5,
    alignItems: 'center',
    width: SIZES.width * 0.7
  },

  settingTxt: {
    fontFamily: 'sfProBlackItalic',
    fontSize: SIZES.small,
    width: SIZES.width * 0.45,
    marginLeft: SIZES.medium
  },

  switchBtn: {
    transform: [{ scale: 0.75 }]
  }
})

export default styles
