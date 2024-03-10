import { View, ActivityIndicator, Platform } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import styles from "./styles/bodyScan.style"
import { COLORS, SIZES } from "../constants"
import { Button } from "../components"

import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import * as tf from "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-converter"
import * as ScreenOrientation from "expo-screen-orientation"
import {
  bundleResourceIO,
  cameraWithTensors,
} from "@tensorflow/tfjs-react-native"

import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"

const TensorCamera = cameraWithTensors(Camera)

const IS_ANDROID = Platform.OS === "android"
const IS_IOS = Platform.OS === "ios"

const CAM_PREVIEW_WIDTH = SIZES.width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)


const OUTPUT_TENSOR_WIDTH = CAM_PREVIEW_WIDTH
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

const cameraType = Camera.Constants.Type.front

const LOAD_MODEL_FROM_BUNDLE = true

const AUTO_RENDER = false

const orientation = ScreenOrientation.getOrientationAsync()

const loadModelWeights = () => {
  const modelWeights = [
    require("../offline_model/bodypix/group1-shard1of23.bin"),
    require("../offline_model/bodypix/group1-shard2of23.bin"),
    require("../offline_model/bodypix/group1-shard3of23.bin"),
    require("../offline_model/bodypix/group1-shard4of23.bin"),
    require("../offline_model/bodypix/group1-shard5of23.bin"),
    require("../offline_model/bodypix/group1-shard6of23.bin"),
    require("../offline_model/bodypix/group1-shard7of23.bin"),
    require("../offline_model/bodypix/group1-shard8of23.bin"),
    require("../offline_model/bodypix/group1-shard9of23.bin"),
    require("../offline_model/bodypix/group1-shard10of23.bin"),
    require("../offline_model/bodypix/group1-shard11of23.bin"),
    require("../offline_model/bodypix/group1-shard12of23.bin"),
    require("../offline_model/bodypix/group1-shard13of23.bin"),
    require("../offline_model/bodypix/group1-shard14of23.bin"),
    require("../offline_model/bodypix/group1-shard15of23.bin"),
    require("../offline_model/bodypix/group1-shard16of23.bin"),
    require("../offline_model/bodypix/group1-shard17of23.bin"),
    require("../offline_model/bodypix/group1-shard18of23.bin"),
    require("../offline_model/bodypix/group1-shard19of23.bin"),
    require("../offline_model/bodypix/group1-shard20of23.bin"),
    require("../offline_model/bodypix/group1-shard21of23.bin"),
    require("../offline_model/bodypix/group1-shard22of23.bin"),
    require("../offline_model/bodypix/group1-shard23of23.bin"),
  ]

  return modelWeights
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

const BodyScan = () => {
  const rafId = useRef(null)
  const cameraRef = useRef(null)
  const scanRef = useRef(null)
  const segmentRef = useRef(null)
  const [model, setModel] = useState()
  const [tfReady, setTfReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      rafId.current = null

      await Camera.requestCameraPermissionsAsync()
      await MediaLibrary.requestPermissionsAsync()

      await tf.ready()

      const segmenterConfig = {
        architecture: "ResNet50",
        outputStride: 16,
        quantBytes: 4,
      }

      if (LOAD_MODEL_FROM_BUNDLE) {
        const modelJson = require("../offline_model/bodypix/model.json")
        const modelWeights = loadModelWeights()
        segmenterConfig.modelUrl = bundleResourceIO(modelJson, modelWeights)
      }

      const model = await bodySegmentation.createSegmenter(
        bodySegmentation.SupportedModels.BodyPix,
        segmenterConfig
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
  })

  const handleCameraStream = async (images, updatePreview, gl) => {
    const loop = async () => {
      const imageTensor = images.next().value

      if (scanRef.current) {

        scanRef.current = false
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

  const renderCamera = () => {
    return (
      <TensorCamera
        ref={cameraRef}
        autorender={AUTO_RENDER}
        type={cameraType}
        resizeWidth={getOutputTensorWidth()}
        resizeHeight={getOutputTensorHeight()}
        rotation={getTextureRotationAngleInDegrees(cameraType)}
        style={styles.camera}
        resizeDepth={3}
        onReady={handleCameraStream}
      ></TensorCamera>
    )
  }

  const renderScanButton = () => {
    return (
      <Button
        title={"Scan"}
        styles={styles}
        isValid={true}
        onPress={() => {
          if (!scanRef.current) {
            scanRef.current = true
          }
        }}
      ></Button>
    )
  }

  if (tfReady) {
    return (
      <View style={styles.containerPortrait}>
        {renderCamera()}
        {renderScanButton()}
      </View>
    )
  } else {
    return (
      <ActivityIndicator
        style={styles.loader}
        size={SIZES.xxLarge}
        color={COLORS.btn}
      ></ActivityIndicator>
    )
  }
}

export default BodyScan
