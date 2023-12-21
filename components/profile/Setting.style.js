import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 40,
    paddingVertical: 24
  },
  guideContainer: {
    marginTop: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: 'rufner',
    fontSize: 15,
    color: COLORS.secondary
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionItem: {
    marginVertical: 12,
    borderColor: COLORS.text,
    borderStyle: 'solid',
    borderLeftWidth: 1
  },
  optionHeader: {
    fontFamily: 'poppinsSemibold',
    fontSize: 14,
    color: COLORS.text,
    paddingLeft: 12
  },
  optionSelected: {
    fontFamily: 'sfProHeavyItalic',
    fontSize: 13,
    color: COLORS.paragraphBg
  },
  optionDesc: {
    fontFamily: 'poppinsRegular',
    fontSize: 13,
    color: COLORS.text,
    paddingLeft: 12,
    marginTop: 4
  }
})

export default styles
