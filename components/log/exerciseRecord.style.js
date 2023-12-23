import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.xSmall,
    height: 27,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.btn
  },

  labelTxt: {
    fontSize: 13
  },

  dropdownIcon: {
    width: 10,
    height: 10
  }
})

export default styles
