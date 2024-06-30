import { StyleSheet, Platform } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

const CAM_PREVIEW_WIDTH = SIZES.width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const styles = StyleSheet.create({
  containerPortrait: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT
  },
  containerLandscape: {
    position: 'relative',
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH
    // marginLeft: SIZES.height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.exerciseBg
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 30
  },
  fpsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
    marginTop: SIZES.height / 2 - CAM_PREVIEW_HEIGHT / 2
  },
  cameraTypeSwitcher: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    zIndex: 20,
    marginTop: SIZES.height / 2 - CAM_PREVIEW_HEIGHT / 2
  },
  notiTxt: {
    fontFamily: 'rufner'
  },
  exerciseName: {
    zIndex: 20,
    position: 'absolute',
    marginTop: SIZES.height / 2 - CAM_PREVIEW_HEIGHT / 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250
  },
  exerciseNameTxt: {
    fontSize: SIZES.medium,
    fontFamily: 'rufner',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: SIZES.medium
  },
  sampleVideo: {
    position: 'absolute',
    zIndex: 999,
    bottom: 60,
    left: 10,
    width: 150,
    height: 200,
  }
})

export default styles
