import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderColor: COLORS.btn,
    borderRadius: 16,
    borderWidth: 1,
    width: 240,
    paddingHorizontal: 4
  },
  input: {
    color: COLORS.text,
    width: 200,
    fontFamily: 'poppinsRegular'
  }
})

export default styles
