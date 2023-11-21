import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./styles/profile.style";
import User from "../components/profile/User";

const Profile = () => {
  return (
    <View style={styles.container}>
      <User></User>
    </View>
  );
};

export default Profile;
