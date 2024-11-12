import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CustomButton } from "../components";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Modal } from "react-native";
import { calculateBMI } from "../api";
import { COLORS } from "../constants";
import styles from "./styles/bodyScan.style";

// Subcomponents
const ScanButton = ({ startCountdown, canScan }) => (
  <CustomButton
    title="Scan"
    styles={styles}
    isValid={canScan}
    label="Scan"
    onPress={startCountdown}
  />
);

const CameraView = ({ cameraRef }) => (
  <Camera
    type={Camera.Constants.Type.front}
    style={styles.camera}
    ref={cameraRef}
  >
    <View style={styles.cameraOverlay} />
  </Camera>
);

const CountdownModal = ({ countDown, onClose }) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={countDown !== null}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.countdownText}>{countDown}</Text>
      </View>
    </View>
  </Modal>
);

const BMIModal = ({ bmi, onClose }) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={bmi !== null}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.bmiText}>Your BMI: {bmi}</Text>
        <CustomButton
          title="Close"
          styles={styles}
          backgroundColor={COLORS.primary400}
          isValid={true}
          label="Close"
          onPress={onClose}
        />
      </View>
    </View>
  </Modal>
);

// TODO: Design the BodyScan screen. @buubuu203
const BodyScan = () => {
  // State management
  const [countDown, setCountDown] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [canScan, setCanScan] = useState(false);
  const cameraRef = useRef(null);

  // Event handlers
  const startCountdown = () => {
    if (canScan) {
      setCountDown(5);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setCanScan(true);
    }
  };

  // Effects
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    const getBMI = async () => {
      const res = await calculateBMI({ userId: 1, uri: selectedImage });
      const bmi = Math.round(res.data.bmi);
      //   console.log(bmi);
      setBmi(bmi);
    };

    if (countDown !== null && countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countDown === 0) {
      getBMI();
      setCountDown(null);
    }
  }, [countDown, selectedImage]);

  return (
    <View style={styles.container}>
      <View style={styles.workoutContainer}>
        {selectedImage && (
          <Image
            resizeMode="contain"
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}
      </View>
      
      <View style={styles.menuContainer}>
        <ScanButton startCountdown={startCountdown} canScan={canScan} />
        <CustomButton
          title="Pick an image from camera roll"
          styles={styles}
          backgroundColor={COLORS.neutral400}
          isValid={true}
          label="Pick an image from camera roll"
          onPress={pickImage}
        />
      </View>

      <CountdownModal 
        countDown={countDown} 
        onClose={() => setCountDown(null)} 
      />
      
      <BMIModal 
        bmi={bmi} 
        onClose={() => setBmi(null)} 
      />
    </View>
  );
};

export default BodyScan;