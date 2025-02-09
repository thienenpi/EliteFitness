import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import styles from "./welcome.style";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={require("../../../assets/icons/profile/3x.png")}
          style={styles.profileImage}
        ></Image>
      </TouchableOpacity>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTxt}>GOOD MORNING</Text>
        <Text style={styles.userName}> {userInfo.name} </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={{ width: 52 }}
      >
        <Image
          source={require("../../../assets/icons/setting/3x.png")}
          style={styles.settingIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
