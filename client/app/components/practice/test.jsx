import React, { useEffect, useState, useRef } from "react";
import { Text, View, Platform, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Svg, { Circle } from "react-native-svg";

import styles from "./poseDetectionApp.style";
import { COLORS, SIZES, HOST_NODEJS } from "../../constants";
import * as util from "../../lib/utilities";
import { JointAngle } from "../../lib/jointAngles";
import { BodyPart } from "../../lib/bodyPart";
import axios from "axios";
import useSpeech from "../../hook/useSpeech";

const IS_ANDROID = Platform.OS === "android";
const IS_IOS = Platform.OS === "ios";

const CAM_PREVIEW_WIDTH = SIZES.width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const MIN_KEYPOINT_SCORE = 0.3;

const OUTPUT_TENSOR_WIDTH = CAM_PREVIEW_WIDTH;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const LOAD_MODEL_FROM_BUNDLE = true;

let data;

const PoseDetectionApp = (props) => {
  const videoRef = useRef(null); // Reference to the video component
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const posesRef = useRef(null);
  const currAngles = useRef(null);
  const prevAngles = useRef(null);
  const timeCnt = useRef(0);

  const { counter, onUpdateCounter, practiceState, item } = props;

  const counterRef = useRef(counter);

  useEffect(() => {
    async function prepare() {
      await MediaLibrary.requestPermissionsAsync();
      await tf.ready();

      const movenetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };

      if (LOAD_MODEL_FROM_BUNDLE) {
        const modelJson = require("../../offline_model/movenet/model.json");
        const modelWeights1 = require("../../offline_model/movenet/group1-shard1of2.bin");
        const modelWeights2 = require("../../offline_model/movenet/group1-shard2of2.bin");
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
          modelWeights1,
          modelWeights2,
        ]);
      }

      const model = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        movenetModelConfig
      );

      setModel(model);
      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (item.csvPath === "none") {
        console.error("CSV path is none");
        return;
      }

      try {
        const response = await axios.get(`${HOST_NODEJS}exercises/${item._id}`);

        if (response.status === 200) {
          data = response.data;
          console.log(data);
        } else {
          console.error(response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleVideoFrame = async (frame) => {
    if (!model || !frame) return;

    const frameTensor = tf.browser.fromPixels(frame);

    const poses = await model.estimatePoses(frameTensor);
    posesRef.current = poses;

    extractData();

    tf.dispose(frameTensor);
  };

  const extractData = () => {
    try {
      const ja = new JointAngle();
      const bp = new BodyPart();
      bp.cords = util.detectJoints(posesRef.current[0].keypoints);

      currAngles.current = ja.bodyAngles(bp);
      const velocities = util.calculateVelocity(
        prevAngles.current != null ? prevAngles.current : currAngles.current,
        currAngles.current,
        500
      );
      prevAngles.current = currAngles.current;

      const dataset = {
        Angles: data.Angles[timeCnt.current * 2],
        Velocities: data.Velocities[timeCnt.current * 2],
      };
      const input = { Angles: currAngles.current, Velocities: velocities };
      const threshold = { Angles: 5, Velocities: 0.1 };
      checkDeviation(dataset, input, threshold);

      if (timeCnt.current * 2 + 1 === data.TimeCnt.length) {
        counterRef.current.rep += 1;
        timeCnt.current = 0;
      }

      if (
        counterRef.current.rep === item.numOfRep &&
        counterRef.current.set < item.numOfSet
      ) {
        counterRef.current.rep = 0;
        counterRef.current.set += 1;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkDeviation = async (dataset, input, threshold) => {
    // Your checkDeviation logic here
  };

  if (!tfReady) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size={SIZES.xxLarge}
        color={COLORS.btn}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          style={styles.sampleVideo}
          resizeMode={ResizeMode.CONTAIN}
          source={{ uri: item.videoUrls[0] }}
          shouldPlay={practiceState}
          isLooping
          onPlaybackStatusUpdate={handleVideoFrame}
        />
        {posesRef.current && (
          <Svg style={styles.svg}>
            {posesRef.current[0].keypoints
              .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
              .map((k) => (
                <Circle
                  key={`skeletonkp_${k.name}`}
                  cx={k.x}
                  cy={k.y}
                  r="4"
                  strokeWidth="2"
                  fill="#00AA00"
                  stroke="white"
                />
              ))}
          </Svg>
        )}
      </View>
    );
  }
};

export default PoseDetectionApp;
