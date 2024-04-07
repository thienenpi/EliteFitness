import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styles from "./user.style";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

const User = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={styles.guideContainer}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../assets/icons/profile/3x.png")}
          style={styles.sideIcon}
        ></Image>
        <Text style={styles.guideTxt}> {userInfo.name} </Text>
      </View>

      <View style={styles.userContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome
            size={24}
            color={COLORS.btn}
            name="diamond"
          ></FontAwesome>
          <Text style={styles.preText}>Premium</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;
