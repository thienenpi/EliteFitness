import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBg
  },

  guideContainer: {
    height: SIZES.xxLarge,
    marginHorizontal: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  sideIcon: {
    height: 14.92,
    width: 31
  },

  guideTxt: {
    fontFamily: 'rufner',
    fontSize: 13,
    color: COLORS.text,
    marginHorizontal: SIZES.xSmall
  },

  muscleContainer: {
    marginHorizontal: SIZES.xxLarge,
    marginVertical: 12
  },

  muscleHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'sfProBlackItalic',
    color: COLORS.btn,
    fontSize: SIZES.medium
  },

  exerciseContainer: {
    marginHorizontal: SIZES.xxLarge,
    height: SIZES.height * 0.5
  },

  exerciseHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default styles
