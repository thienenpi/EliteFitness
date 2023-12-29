import React, { useEffect, useState, useRef } from 'react'
import { Text, View, Platform, Switch, ActivityIndicator } from 'react-native'
import { Camera } from 'expo-camera'
import { Video, ResizeMode } from 'expo-av'
import * as MediaLibrary from 'expo-media-library'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl'

import * as ScreenOrientation from 'expo-screen-orientation'
import { cameraWithTensors, bundleResourceIO } from '@tensorflow/tfjs-react-native'
import Svg, { Circle } from 'react-native-svg'

import styles from './poseDetectionApp.style'
import { COLORS, SIZES, HOST } from '../../constants'
import * as util from '../../lib/utilities'
import { JointAngle } from '../../lib/jointAngles'
import { BodyPart } from '../../lib/bodyPart'
import axios from 'axios'
import useSpeech from '../../hook/useSpeech'
import uploadPicture from '../../hook/uploadPicture'

const TensorCamera = cameraWithTensors(Camera)

const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

const CAM_PREVIEW_WIDTH = SIZES.width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const MIN_KEYPOINT_SCORE = 0.3

const OUTPUT_TENSOR_WIDTH = CAM_PREVIEW_WIDTH
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const AUTO_RENDER = false

const LOAD_MODEL_FROM_BUNDLE = true

const orientation = ScreenOrientation.getOrientationAsync()

let data

const renderVideo = (practiceState, uri) => {
    return (
      <Video
        style={styles.sampleVideo}
        resizeMode={ResizeMode.CONTAIN}
          source={{ uri: uri }}
        isLooping={true}
        shouldPlay={practiceState}
      ></Video>
    )
  }

const isPortrait = async () => {
  return !(
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
  )
}

const getOutputTensorWidth = () => {
  return isPortrait() || IS_ANDROID ? OUTPUT_TENSOR_WIDTH : OUTPUT_TENSOR_HEIGHT
}

const getOutputTensorHeight = () => {
  return isPortrait() || IS_ANDROID ? OUTPUT_TENSOR_HEIGHT : OUTPUT_TENSOR_WIDTH
}

const renderPose = (posesRef, cameraType) => {
  if (posesRef.current != null && posesRef.current.length > 0) {
    const keypoints = posesRef.current[0].keypoints
      .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
      .map((k) => {
        const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back
        const x = flipX ? getOutputTensorWidth() - k.x : k.x
        const y = k.y
        const cx =
          (x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT)
        const cy =
          (y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH)
        return (
          <Circle
            key={`skeletonkp_${k.name}`}
            cx={cx}
            cy={cy}
            r="4"
            strokeWidth="2"
            fill="#00AA00"
            stroke="white"
          />
        )
      })

    return <Svg style={styles.svg}>{keypoints}</Svg>
  } else {
    return <View></View>
  }
}

const renderExerciseName = (name) => {
  return (
    <View style={styles.exerciseName}>
      <Text style={styles.exerciseNameTxt}> {name} </Text>
    </View>
  )
}

const getTextureRotationAngleInDegrees = (cameraType) => {
  if (IS_ANDROID) {
    return 0
  }

  switch (orientation) {
    case ScreenOrientation.Orientation.PORTRAIT_DOWN:
      return 180
    case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
      return cameraType === Camera.Constants.Type.front ? 270 : 90
    case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
      return cameraType === Camera.Constants.Type.front ? 90 : 270
    default:
      return 0
  }
}

const PoseDetectionApp = (props) => {
  const rafId = useRef(null)
  const cameraRef = useRef(null)
  const [tfReady, setTfReady] = useState(false)
  const [model, setModel] = useState()
  //   const [poses, setPoses] = useState(null)
  //   const [fps, setFps] = useState(0)
  //   const [orientation, setOrientation] = useState()
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

  //   const dataset = useRef([])

  const {
    counter,
    onUpdateCounter,
    practiceState,
    onUpdatePracticeState,
    cameraState,
    recordState,
    item
  } = props

  const counterRef = useRef(counter)
  const renderRef = useRef(false)
  const posesRef = useRef(null)
  const currAngles = useRef(null)
  const prevAngles = useRef(null)
  const timeCnt = useRef(0)

  useEffect(() => {
    async function prepare() {
      rafId.current = null

      //   const curOrientation = await ScreenOrientation.getOrientationAsync()
      //   setOrientation(curOrientation)

      //   ScreenOrientation.addOrientationChangeListener((event) => {
      //     setOrientation(event.orientationInfo.orientation)
      //   })

      await Camera.requestCameraPermissionsAsync()
      await MediaLibrary.requestPermissionsAsync()

      await tf.ready()

      const movenetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true
      }

      if (LOAD_MODEL_FROM_BUNDLE) {
        const modelJson = require('../../offline_model/model.json')
        const modelWeights1 = require('../../offline_model/group1-shard1of2.bin')
        const modelWeights2 = require('../../offline_model/group1-shard2of2.bin')
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [modelWeights1, modelWeights2])
      }

      const model = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        movenetModelConfig
      )

      setModel(model)
      setTfReady(true)
    }

    prepare()
  }, [])

  useEffect(() => {
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
      }
    }
  }, [])

  //   useEffect(() => {
  //     if (recordState) {
  //       startRecording()
  //     } else {
  //       stopRecording()
  //     }
  //     console.log(recordState)
  //   }, [recordState])

  useEffect(() => {
    const fetchData = async () => {
      if (item.csvPath === 'none') {
        console.error('CSV path is none')
        return
      }

      try {
        const response = await axios.get(`${HOST}exercises/${item._id}`)

        if (response.status === 200) {
          data = response.data
        } else {
          console.error(response.statusText)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (practiceState) {
      renderRef.current = true

      const intervalId = setInterval(() => {
        if (counterRef.current.set === item.numOfSet && counterRef.current.rep === item.numOfRep) {
          onUpdatePracticeState()
        }

        renderRef.current = true
        timeCnt.current += 0.5
        onUpdateCounter({ ...counterRef.current })
      }, 500)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [practiceState])

  const checkDeviation = async (dataset, input, threshold) => {
    const bodyParts = [
      'neck',
      'left arm',
      'right arm',
      'abdomen',
      'internal',
      'left leg',
      'right leg',
      'left armpit',
      'right armpit'
    ]

    const anglesFromDataset = dataset.Angles.map(Number)
    const anglesFromInput = input.Angles.map(Number)
    const velocitiesFromDataset = dataset.Velocities.map(Number)
    const velocitiesFromInput = input.Velocities.map(Number)

    const deviationAngles = anglesFromDataset.map((value, index) => value - anglesFromInput[index])
    const deviationVelocities = velocitiesFromDataset.map(
      (value, index) => Math.abs(velocitiesFromInput[index]) - Math.abs(value)
    )

    var lines = ''

    for (var i = 0; i < deviationVelocities.length; i++) {
      const value = deviationVelocities[i]
      if (Math.abs(value) > threshold.Velocities) {
        counterRef.current.score -= 0.25
        lines += `Too ${value > 0 ? 'fast' : 'slow'}\n`
        useSpeech(lines)
        break
      }
    }

    if (lines === '') {
      deviationAngles.forEach((value, index) => {
        if (Math.abs(value) > threshold.Angles) {
          counterRef.current.score -= 0.25
          const line = `${bodyParts[index]}: ${value > 0 ? 'larger' : 'smaller'} ${Math.abs(
            value
          )} degrees\n`
          lines += line
          useSpeech(bodyParts[index])
        }
      })
    }

    counterRef.current.correction = lines === '' ? 'Good' : lines

    if (lines !== '') {
      const options = { quality: 0.5, base64: true }
      const picture = await cameraRef.current.camera.takePictureAsync(options)
      uploadPicture(picture, item.title)
    }
  }

  //   const startRecording = async () => {
  //     if (cameraRef.current) {
  //       try {
  //         const videoOptions = {
  //           quality: Camera.Constants.VideoQuality["720p"],
  //           // maxDuration: 60, // 60 seconds
  //         }

  //         const videoRecordPromise = cameraRef.current.recordAsync(videoOptions)
  //         const videoRecordData = await videoRecordPromise

  //         await saveVideoToLibrary(videoRecordData.uri)
  //       } catch (error) {
  //         console.error("Error recording video:", error)
  //       }
  //     } else {
  //       console.error("cameraRef is not available")
  //     }
  //   }

  //   const saveVideoToLibrary = async (videoUri) => {
  //     try {
  //       const asset = await MediaLibrary.createAssetAsync(videoUri)
  //       await MediaLibrary.createAlbumAsync("Expo Videos", asset, false)
  //       console.log("Video saved to Photos")
  //     } catch (error) {
  //       console.error("Error saving video to Photos:", error)
  //     }
  //   }

  //   const stopRecording = async () => {
  //     if (cameraRef.current) {
  //       cameraRef.current.stopRecording()
  //     }
  //   }

  const handleCameraStream = async (images, updatePreview, gl) => {
    const loop = async () => {
      const imageTensor = images.next().value

      //   const startTs = Date.now()
      //   console.log('first')
      //   console.log(poses)
      //   if (renderRef.current === false && poses != null) {
      //     console.log('render here')
      //     setPoses(null)
      //   }

      if (renderRef.current) {
        // console.log(renderRef.current)
        posesRef.current = await model.estimatePoses(imageTensor, undefined, Date.now())
        //   const latency = Date.now() - startTs
        //   setFps(Math.floor(1000 / latency))
        renderRef.current = false
        extractData()
      }
      tf.dispose([imageTensor])

      if (rafId.current === 0) {
        return
      }

      if (!AUTO_RENDER) {
        updatePreview()
        gl.endFrameEXP()
      }

      rafId.current = requestAnimationFrame(loop)
    }

    loop()
  }

  const extractData = () => {
    try {
      const ja = new JointAngle()
      const bp = new BodyPart()
      bp.cords = util.detectJoints(posesRef.current[0].keypoints)

      currAngles.current = ja.bodyAngles(bp)
      const velocities = util.calculateVelocity(
        prevAngles.current != null ? prevAngles.current : currAngles.current,
        currAngles.current,
        500
      )
      prevAngles.current = currAngles.current

      const dataset = {
        Angles: data.Angles[timeCnt.current * 2],
        Velocities: data.Velocities[timeCnt.current * 2]
      }
      const input = { Angles: currAngles.current, Velocities: velocities }
      const threshold = { Angles: 20, Velocities: 0.1 }
      checkDeviation(dataset, input, threshold)

      console.log(timeCnt.current)
      if (timeCnt.current * 2 + 1 === data.TimeCnt.length) {
        counterRef.current.rep += 1
        timeCnt.current = 0
      }

      if (counterRef.current.rep === item.numOfRep && counterRef.current.set < item.numOfSet) {
        counterRef.current.rep = 0
        counterRef.current.set += 1
      }

      // Create dataset
      // const record = {
      //   TimeCnt: timeCnt.current,
      //   Angles: currAngles.current,
      //   Velocities: velocities
      // }
      // dataset.current.push(record)

      // console.log('dataset', dataset.current)
    } catch (error) {
      console.error(error)
    }
  }

  //   const renderFps = () => {
  //     return (
  //       <View style={styles.fpsContainer}>
  //         <Text>FPS: {fps}</Text>
  //       </View>
  //     )
  //   }

  const renderCameraTypeSwitcher = () => {
    return (
      <View style={styles.cameraTypeSwitcher}>
        <Switch
          trackColor={{ true: COLORS.exerciseBg, false: COLORS.text }}
          thumbColor={cameraType === Camera.Constants.Type.front ? COLORS.btn : COLORS.text}
          onValueChange={toggleCameraType}
          value={cameraType === Camera.Constants.Type.front}
        />
      </View>
    )
  }

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const renderCamera = () => {
    if (!cameraState) {
      return (
        <View style={styles.camera}>
          <Text style={styles.notiTxt}>Camera is turn off</Text>
        </View>
      )
    } else {
      return (
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={AUTO_RENDER}
          type={cameraType}
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees(cameraType)}
          onReady={handleCameraStream}
        ></TensorCamera>
      )
    }
  }



  if (!tfReady) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size={SIZES.xxLarge}
        color={COLORS.btn}
      ></ActivityIndicator>
    )
  } else {
    return (
      <View style={isPortrait() ? styles.containerPortrait : styles.containerLandscape}>
        {renderExerciseName(item.title)}
        {renderCamera()}
        {renderVideo(practiceState, item.videoUrls[0])}
        {renderPose(posesRef, cameraType)}
        {/* {renderFps()} */}
        {renderCameraTypeSwitcher()}
      </View>
    )
  }
}

export default PoseDetectionApp
