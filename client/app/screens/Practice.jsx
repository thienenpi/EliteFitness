import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles/practice.style";
import { COLORS } from "../constants";
import CustomButton from "../components/CustomButton";
import SettingRow from "../components/SettingRow";
// import VideoRecording from '../components/practice/VideoRecording'
import PoseDetectionApp from "../components/practice/PoseDetectionApp";

const Practice = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [cameraState, setCameraState] = useState(true);
  const [recordState, setRecordState] = useState(false);
  const [practiceState, setPracticeState] = useState(false);
  const [counter, setCounter] = useState({
    stage: "none",
    set: 1,
    rep: 0,
    score: 100,
    correction: "Good",
  });

  const updateCounter = (newCounter) => {
    setCounter(newCounter);
  };

  const updateCameraState = () => {
    setCameraState((prevState) => !prevState);
  };

  const updateRecordState = () => {
    setRecordState((prevState) => !prevState);
  };

  const updatePracticeState = () => {
    setPracticeState((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.workoutContainer}>
        {/* <VideoRecording></VideoRecording> */}
        <PoseDetectionApp
          item={item}
          counter={counter}
          recordState={recordState}
          practiceState={practiceState}
          cameraState={cameraState}
          onUpdateCounter={updateCounter}
          onUpdatePracticeState={updatePracticeState}
        ></PoseDetectionApp>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.trackContainer}>
            <Text style={styles.trackTitle}> Stage </Text>
            <Text style={styles.trackValue}> {counter.stage} </Text>

            <Text style={styles.trackTitle}> Set </Text>
            <Text style={styles.trackValue}>
              {" "}
              {counter.set}/{item.numOfSet}{" "}
            </Text>
          </View>

          <View style={styles.trackContainer}>
            <Text style={styles.trackTitle}> Reps </Text>
            <Text style={styles.trackValue}>
              {" "}
              {counter.rep}/{item.numOfRep}{" "}
            </Text>

            <Text style={styles.trackTitle}> Score </Text>
            <Text style={styles.trackValue}> {counter.score} </Text>
          </View>

          <Image source={require("../../assets/icons/divider/1x.png")}></Image>
          <View style={styles.crtContainer}>
            <Text style={styles.crtTitle}>Correction</Text>
            <Text style={styles.crtValue(COLORS.accept)}>
              {counter.correction}
            </Text>
          </View>
        </View>

        <SettingRow
          styles={styles}
          title={"Turn off your camera"}
          iconName={"camera"}
          onChange={updateCameraState}
          value={!cameraState}
        ></SettingRow>

        <SettingRow
          styles={styles}
          title={"Record your workout"}
          iconName={"clipboard-file"}
          onChange={updateRecordState}
          value={recordState}
        ></SettingRow>

        <CustomButton
          styles={styles}
          label={practiceState ? "Done" : "Start"}
          isValid={true}
          onPress={updatePracticeState}
        ></CustomButton>
      </View>
    </View>
  );
};

export default Practice;
