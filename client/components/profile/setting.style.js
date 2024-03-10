import { StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    maxWidth: SIZES.width * 0.7,
    fontFamily: 'poppinsRegular',
    fontSize: 13,
    color: COLORS.text,
    paddingLeft: 12,
    marginTop: 4,
    textAlign: 'justify'
  }
})

export default styles
