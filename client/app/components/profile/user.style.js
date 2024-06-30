import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  guideContainer: {
    paddingTop: 60,
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  sideIcon: {
    height: 40,
    width: 40
  },

  guideTxt: {
    fontFamily: 'poppinsSemibold',
    fontSize: 13,
    color: COLORS.text,
    marginHorizontal: SIZES.xSmall
  },

  preText: {
    fontFamily: 'poppinsBold',
    fontSize: 12,
    color: COLORS.btn,
    textTransform: 'uppercase',
    marginHorizontal: SIZES.xSmall
  }
})

export default styles
