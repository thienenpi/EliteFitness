import React, { useContext } from "react";
import { Alert, ScrollView, View } from "react-native";
import styles from "./styles/profile.style";
import { CustomButton, Setting, User } from "../components/";
import { AuthContext } from "../context/AuthContext";
import { deleteUser } from "../api";

const showNotification = (message) => {
  Alert.alert("Notification", message, [
    {
      text: "OK",
      onPress: () => {
        console.log("OK Pressed");
      },
    },
  ]);
};

const showConfirm = (message, onConfirm) => {
  Alert.alert("Confirm", message, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "OK",
      onPress: onConfirm,
    },
  ]);
};

const Profile = () => {
  const { logout, userInfo, setIsLoading } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <User></User>
      <Setting></Setting>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <CustomButton
          label={"Log out"}
          styles={styles}
          isValid={true}
          onPress={logout}
        ></CustomButton>

        {userInfo._id && (
          <CustomButton
            label={"Delete account"}
            styles={styles}
            isValid={true}
            onPress={() => {
              showConfirm(
                "Are you sure you want to delete your account?",
                () => {
                  setIsLoading(true);
                  deleteUser({ userId: userInfo._id })
                    .then(() =>
                      showNotification(
                        "Your account has been successfully deleted"
                      )
                    )
                    .then(logout);
                }
              );
            }}
          ></CustomButton>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
