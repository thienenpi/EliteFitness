import { View, Text, ActivityIndicator, SafeAreaView } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import styles from "./styles/bodyScan.style"
import { COLORS, SIZES } from "../constants"

import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import * as tf from "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-converter"
import { bundleResourceIO } from "@tensorflow/tfjs-react-native"

const LOAD_MODEL_FROM_BUNDLE = true

const loadModelWeights = () => {

  const modelWeights = [
    require('../offline_model/bodypix/group1-shard1of23.bin'),
    require('../offline_model/bodypix/group1-shard2of23.bin'),
    require('../offline_model/bodypix/group1-shard3of23.bin'),
    require('../offline_model/bodypix/group1-shard4of23.bin'),
    require('../offline_model/bodypix/group1-shard5of23.bin'),
    require('../offline_model/bodypix/group1-shard6of23.bin'),
    require('../offline_model/bodypix/group1-shard7of23.bin'),
    require('../offline_model/bodypix/group1-shard8of23.bin'),
    require('../offline_model/bodypix/group1-shard9of23.bin'),
    require('../offline_model/bodypix/group1-shard10of23.bin'),
    require('../offline_model/bodypix/group1-shard11of23.bin'),
    require('../offline_model/bodypix/group1-shard12of23.bin'),
    require('../offline_model/bodypix/group1-shard13of23.bin'),
    require('../offline_model/bodypix/group1-shard14of23.bin'),
    require('../offline_model/bodypix/group1-shard15of23.bin'),
    require('../offline_model/bodypix/group1-shard16of23.bin'),
    require('../offline_model/bodypix/group1-shard17of23.bin'),
    require('../offline_model/bodypix/group1-shard18of23.bin'),
    require('../offline_model/bodypix/group1-shard19of23.bin'),
    require('../offline_model/bodypix/group1-shard20of23.bin'),
    require('../offline_model/bodypix/group1-shard21of23.bin'),
    require('../offline_model/bodypix/group1-shard22of23.bin'),
    require('../offline_model/bodypix/group1-shard23of23.bin'),
  ]

  return modelWeights
}

const BodyScan = () => {
  const [model, setModel] = useState()
  const [tfReady, setTfReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
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
        console.log('loaded')
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

  if (tfReady) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>loaded</Text>
      </SafeAreaView>
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
