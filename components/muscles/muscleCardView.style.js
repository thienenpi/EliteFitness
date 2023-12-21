import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
  container: {
    height: 85,
    justifyContent: 'space-between'
  },

  imageContainer: (borderColor) => ({
    width: 74,
    height: 69,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: SIZES.xSmall
  }),

  image: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: SIZES.xSmall,
    // ...StyleSheet.absoluteFillObject,
    // overlayColor: COLORS.text,
    width: 72,
    height: 67
  },

  details: {
    alignItems: 'center'
  },

  title: {
    fontFamily: 'rufner',
    fontSize: SIZES.xSmall
  }
})

export default styles
