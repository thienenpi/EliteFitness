import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    // borderColor: COLORS.btn,
    // borderWidth: 2,
    margin: 4
  },
  productContainer: {
    backgroundColor: COLORS.productBg,
    borderRadius: 8,
    width: 160,
    height: 220
  },
  productImg: {
    width: 140,
    height: 140,
    marginTop: 6,
    alignSelf: 'center'
  },
  productTitle: {
    height: 38,
    // width: 160,
    textAlign: 'center',
    paddingHorizontal: 2,
    fontFamily: 'poppinsMedium',
    color: COLORS.text,
    fontSize: 13,
    marginVertical: 2
  },
  productPrice: {
    textAlign: 'center',
    // paddingHorizontal: 6,
    fontFamily: 'poppinsBold',
    color: COLORS.paragraphBg,
    fontSize: 14,
    marginBottom: 2
  }
})

export default styles
