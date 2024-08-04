// File path: BodyScan.js

import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/bodyScan.style";
import { CustomButton } from "../components";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Modal } from "react-native";
import { calculateBMI } from "../api";

const renderScanButton = ({ startCountdown }) => {
  return (
    <CustomButton
      title={"Scan"}
      styles={styles}
      isValid={true}
      label={"Scan"}
      onPress={startCountdown}
    ></CustomButton>
  );
};

const renderCamera = ({ cameraRef }) => {
  return (
    <Camera
      type={Camera.Constants.Type.front}
      style={styles.camera}
      ref={cameraRef}
    >
      <View style={styles.cameraOverlay}>
        {/* <Text style={styles.cameraText}>Body Scan</Text> */}
      </View>
    </Camera>
  );
};

const BodyScan = () => {
  const [countDown, setCountDown] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null);

  const startCountdown = () => {
    setCountDown(5);
  };

  const checkPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
      //   const res = await calculateBMI({ userId: 1, uri: photo.uri });

      //   console.log(res.data.bmi);
      // You can handle the photo uri here (e.g., save it, send it to server, etc.)
    }
  };

  //   if (hasPermission === null) {
  //     return <View />;
  //   }

  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }

  useEffect(() => {
    const getBMI = async () => {
      const res = await calculateBMI({ userId: 1, uri: selectedImage });
      //   console.log(selectedImage)
      const bmi = Math.round(res.data.bmi);
    //   console.log(bmi);
      setBmi(bmi);
    };

    if (countDown !== null && countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countDown === 0) {
      //   takePicture();
      getBMI();
      setCountDown(null);
    }
  }, [countDown]);

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.workoutContainer}>
        {/* {renderCamera({ cameraRef: cameraRef })} */}
        {/* <Text>{countDown !== null ? countDown : ""}</Text> */}
        {selectedImage && (
          <Image
            resizeMode="contain"
            source={{ uri: selectedImage }}
            style={{
              position: "absolute",
              //   top: 0,
              //   left: 0,
              //   right: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </View>
      <View style={styles.menuContainer}>
        {renderScanButton({ startCountdown })}
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={countDown !== null}
        onRequestClose={() => setCountDown(null)}
      >
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.countdownText}>{countDown}</Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={bmi !== null}
        onRequestClose={() => setBmi(null)}
      >
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.bmiText}>Your BMI: {bmi}</Text>
            <Button title="Close" onPress={() => setBmi(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  countdownText: {
    fontSize: 48,
    fontWeight: "bold",
  },

  bmiText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default BodyScan;
