import { StyleSheet } from 'react-native'
import { SIZES, COLORS, TEXTS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium
  },

  btnContainer: (backgroundColor) => ({
    height: 50,
    marginVertical: 10,
    marginHorizontal: SIZES.xxLarge * 2,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  }),

  btnLabel: {
   
    fontFamily: "sfProBlackItalic",
    color: COLORS.neutral900,
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.large,
  }
})

export default styles
