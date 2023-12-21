import { Platform, StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const IS_IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // marginTop: 340,
    marginHorizontal: 40,
    textAlign: 'center',
    // width: "100%",
    flex: 1,
    marginBottom: IS_IOS ? 80 : 10
  },

  separator: {
    height: 16
  },

  headerTxt: {
    fontFamily: 'poppinsMedium',
    fontSize: 16,
    color: COLORS.paragraphBg,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10
  }
})

export default styles
