import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    backgroundColor: COLORS.primaryBg
  },

  header: {
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    flexDirection: 'row'
  },
  userTxt: {
    fontFamily: 'rufner',
    color: COLORS.text,
    fontSize: 16
  }
})

export default styles
