import React from "react"
import { View } from "react-native"
import Setting from "../components/profile/Setting"
import User from "../components/profile/User"
import styles from "./styles/profile.style"

const Profile = () => {
  return (
    <View style={styles.container}>
      <User></User>
      <Setting></Setting>
    </View>
  )
}

export default Profile
