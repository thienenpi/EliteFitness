import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryBg,
    flex: 1
  },

  header: {
    alignItems: 'center'
  },

  headerText: {
    fontFamily: 'rufner',
    color: COLORS.btn,
    fontSize: SIZES.large
  },

  convo: {},

  botAvatar: {
    height: 40,
    width: 40
  },

  inputWrapper: {
    flexDirection: 'row',
    borderRadius: SIZES.large,
    borderColor: COLORS.btn,
    borderWidth: 1,
    padding: 10,
    marginBottom: SIZES.height * 0.01,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  inputText: {
    color: COLORS.text,
    width: 280,
    textAlign: 'justify'
  },

  sendIcon: {
    color: COLORS.btn
  },

  bubble: (user) => ({
    backgroundColor: user === 1 ? COLORS.exerciseBg : COLORS.btn,
    borderRadius: 10,
    padding: 10,
    maxWidth: SIZES.width * 0.7
  }),

  separator: {
    height: SIZES.medium
  }
})

export default styles
