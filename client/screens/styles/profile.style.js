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
    paddingTop: 80,
    height: SIZES.xxLarge,
    marginHorizontal: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  sideIcon: {
    height: 40,
    width: 40
  },

  guideTxt: {
    fontFamily: 'rufner',
    fontSize: 13,
    color: COLORS.text,
    marginHorizontal: SIZES.xSmall
  }
})

export default styles
