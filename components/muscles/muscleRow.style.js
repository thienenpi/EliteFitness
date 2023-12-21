import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium
  },

  btn: (backgroundColor) => ({
    height: 50,
    marginVertical: 10,
    marginHorizontal: SIZES.xxLarge * 2,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  }),

  btnText: {
    fontFamily: 'sfProBlackItalic',
    color: COLORS.white,
    fontSize: 18
  }
})

export default styles
