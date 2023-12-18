import React, { useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native"
import { Camera } from "expo-camera"
import { NativeModules } from "react-native"
import * as MediaLibrary from "expo-media-library"
import { COLORS } from "../../constants"


const VideoRecording = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync()

      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      )
    })()
  }, [])

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setHasPermission(true)
        setIsRecording(true)

        const videoOptions = {
          quality: Camera.Constants.VideoQuality["720p"],
          //   maxDuration: 60, // 60 seconds
        }

        const videoRecordPromise = cameraRef.current.recordAsync(videoOptions)
        const videoRecordData = await videoRecordPromise

        await saveVideoToLibrary(videoRecordData.uri)
      } catch (error) {
        console.error("Error recording video:", error)
      }
    }
  }

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording()
      setIsRecording(false)
    }
  }

  const saveVideoToLibrary = async (videoUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(videoUri)
      await MediaLibrary.createAlbumAsync("Expo Videos", asset, false)
      console.log("Video saved to Photos")
    } catch (error) {
      console.error("Error saving video to Photos:", error)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>No access to camera or media library</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 20,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={toggleRecording}>
            <Text style={{ fontSize: 18, color: "white" }}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Text>
          </TouchableOpacity>
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
      </Camera>
    </View>
  )
}

export default VideoRecording
