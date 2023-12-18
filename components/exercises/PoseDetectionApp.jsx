import React, { useEffect, useState, useRef } from "react"
import {
  Text,
  View,
  Dimensions,
  Platform,
  Switch,
  ActivityIndicator,
} from "react-native"
import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as poseDetection from "@tensorflow-models/pose-detection"
import * as tf from "@tensorflow/tfjs"
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl"

import * as ScreenOrientation from "expo-screen-orientation"
import { cameraWithTensors } from "@tensorflow/tfjs-react-native"
import Svg, { Circle } from "react-native-svg"
import styles from "./poseDetectionApp.style"
import { COLORS, SIZES, IP_ADDRESS } from "../../constants"
import * as util from "../../lib/utilities"
import { JointAngle } from "../../lib/jointAngles"
import { BodyPart } from "../../lib/bodyPart"
import axios from "axios"
import useSpeech from "../../hook/useSpeech"

const TensorCamera = cameraWithTensors(Camera)

const IS_ANDROID = Platform.OS === "android"
const IS_IOS = Platform.OS === "ios"

const CAM_PREVIEW_WIDTH = Dimensions.get("window").width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const MIN_KEYPOINT_SCORE = 0.3

const OUTPUT_TENSOR_WIDTH = CAM_PREVIEW_WIDTH
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const AUTO_RENDER = false

// const LOAD_MODEL_FROM_BUNDLE = false
let data
var prevAngles,
  currAngles = null,
  velocities,
  prevStartAt = 0,
  currStartAt = null

const PoseDetectionApp = ({
  practiceState,
  recordState,
  cameraState,
  item,
  onUpdateCounter,
}) => {
  const rafId = useRef(null)
  const cameraRef = useRef(null)
  const [tfReady, setTfReady] = useState(false)
  const [model, setModel] = useState()
  const [poses, setPoses] = useState()
  const [fps, setFps] = useState(0)
  const [start, setStart] = useState(practiceState)
  const [orientation, setOrientation] = useState()
  const [dataSet, setDataSet] = useState([])
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [timeCnt, setTimeCnt] = useState(0)
  const [counter, setCounter] = useState({
    stage: "none",
    set: 1,
    rep: 0,
    score: 100,
    correction: "Good",
  })

  useEffect(() => {
    async function prepare() {
      rafId.current = null

      const curOrientation = await ScreenOrientation.getOrientationAsync()
      setOrientation(curOrientation)

      ScreenOrientation.addOrientationChangeListener((event) => {
        setOrientation(event.orientationInfo.orientation)
      })

      await Camera.requestCameraPermissionsAsync()
      await MediaLibrary.requestPermissionsAsync()

      await tf.ready()

      const movenetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      }

      //   if (LOAD_MODEL_FROM_BUNDLE) {
      //     const modelJson = require("./offline_model/model.json")
      //     const modelWeights1 = require("./offline_model/group1-shard1of2.bin")
      //     const modelWeights2 = require("../../ai/offline_model/group1-shard2of2.bin")
      //     movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
      //       modelWeights1,
      //       modelWeights2,
      //     ])
      //   }

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
      if (item.csvPath === "none") {
        console.error("CSV path is none")
        return
      }

      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:3000/api/exercises/${item._id}`
        )

        if (response.status === 200) {
          data = response.data
        } else {
          console.error(response.statusText)
        }
      } catch (error) {
        console.error(error)
      }
    }

    setStart(practiceState)
    fetchData()
  }, [practiceState, IP_ADDRESS])

  useEffect(() => {
    onUpdateCounter(counter)
  }, [timeCnt])

  const checkDeviation = (vectorFromDataset, inputVector, threshold, time) => {
    const bodyParts = [
      "neck",
      "left arm",
      "right arm",
      "abdomen",
      "internal",
      "left leg",
      "right leg",
      "left armpit",
      "right armpit",
    ]

    const arrayFromDataset = vectorFromDataset.map(Number)
    const arrayFromInput = inputVector.map(Number)

    const deviation = arrayFromDataset.map(
      (value, index) => value - arrayFromInput[index]
    )

    var lines = ""
    deviation.forEach((value, index) => {
      if (Math.abs(value) > threshold) {
        const line = `${bodyParts[index]} - ${
          value > 0 ? "larger" : "smaller"
        }  ${Math.abs(value)} degrees\n`
        lines += line
        useSpeech(bodyParts[index])
      }
    })

    setCounter((prev) => ({
      ...prev,
      correction: lines === "" ? "Good" : lines,
    }))
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

      const startTs = Date.now()
      const poses = await model.estimatePoses(
        imageTensor,
        undefined,
        Date.now()
      )
      const latency = Date.now() - startTs
      setFps(Math.floor(1000 / latency))
      setPoses(poses)
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
      bp.cords = util.detectJoints(poses[0].keypoints)

      currAngles = ja.bodyAngles(bp)

      currStartAt = Date.now()
      prevStartAt = prevStartAt ? prevStartAt : currStartAt

      if (prevAngles) {
        const duration = currStartAt - prevStartAt
        if (duration > 500) {
          setTimeCnt((prev) => prev + 0.5)
          prevStartAt = currStartAt
          velocities = util.calculateVelocity(prevAngles, currAngles, duration)
          prevAngles = currAngles
          checkDeviation(data.Angles[timeCnt * 2], currAngles, 20, timeCnt)
          //   const record = {
          //     TimeCnt: timeCnt,
          //     Angles: currAngles,
          //     Velocities: velocities,
          //   }
          //   setDataSet((curr) => [...curr, record])

          if (timeCnt * 2 + 1 === data.TimeCnt.length) {
            setCounter((prev) => ({
              ...prev,
              rep: prev.rep + 1,
            }))

            setTimeCnt(0)
          }

          if (counter.rep === item.numOfRep && counter.set < item.numOfSet) {
            setCounter((prev) => ({
              ...prev,
              rep: 0,
              set: prev.set + 1,
            }))
          }

          if (counter.set === item.numOfSet && counter.rep === item.numOfRep) {
            setStart(!start)
          }
        }
      } else {
        const duration = 1
        velocities = util.calculateVelocity(currAngles, currAngles, duration)
        prevAngles = currAngles
        checkDeviation(data.Angles[timeCnt * 2], currAngles, 20, timeCnt)
        // const record = {
        //   TimeCnt: timeCnt,
        //   Angles: currAngles,
        //   Velocities: velocities,
        // }
        // setDataSet((curr) => [...curr, record])
      }

      //   console.log("dataSet", dataSet)
    } catch (error) {
      console.error(error)
    }
  }

  const renderPose = () => {
    if (poses != null && poses.length > 0) {
      const keypoints = poses[0].keypoints
        .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((k) => {
          const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back
          const x = flipX ? getOutputTensorWidth() - k.x : k.x
          const y = k.y
          const cx =
            (x / getOutputTensorWidth()) *
            (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT)
          const cy =
            (y / getOutputTensorHeight()) *
            (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH)
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

      extractData()
      return <Svg style={styles.svg}>{keypoints}</Svg>
    } else {
      return <View></View>
    }
  }

  const renderFps = () => {
    return (
      <View style={styles.fpsContainer}>
        <Text>FPS: {fps}</Text>
      </View>
    )
  }

  const renderCameraTypeSwitcher = () => {
    return (
      <View style={styles.cameraTypeSwitcher}>
        <Switch
          trackColor={{ true: COLORS.exerciseBg, false: COLORS.text }}
          thumbColor={
            cameraType === Camera.Constants.Type.front
              ? COLORS.btn
              : COLORS.text
          }
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

  const isPortrait = () => {
    return !(
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    )
  }

  const getOutputTensorWidth = () => {
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_WIDTH
      : OUTPUT_TENSOR_HEIGHT
  }

  const getOutputTensorHeight = () => {
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_HEIGHT
      : OUTPUT_TENSOR_WIDTH
  }

  const getTextureRotationAngleInDegrees = () => {
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
      <View
        style={
          isPortrait() ? styles.containerPortrait : styles.containerLandscape
        }
      >
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={AUTO_RENDER}
          type={cameraType}
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        {start && renderPose()}
        {renderFps()}
        {renderCameraTypeSwitcher()}
      </View>
    )
  }
}

export default PoseDetectionApp
