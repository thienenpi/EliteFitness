import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { userLogin, userRegister } from "../api/UserApi";
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      "636989636710-6q1hljjkdsl0haotth2hpc5n2qrsgqvt.apps.googleusercontent.com",
    androidClientId:
      "636989636710-0oum0d2d47v6ugu8vu5t3en2677t5afv.apps.googleusercontent.com",
    iosClientId:
      "636989636710-v0dbjqosmveq8fa47c1e6mv4es2p4p64.apps.googleusercontent.com",
  });
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const register = async ({ data }) => {
    const res = await userRegister({ data: data });

    if (res.status === 200) {
      const responseData = res.data;

      setIsLoading(true);
      setUserInfo(responseData);
      setUserToken(responseData.token);

      AsyncStorage.setItem("userInfo", JSON.stringify(responseData));
      AsyncStorage.setItem("userToken", JSON.stringify(responseData.token));

      setIsLoading(false);
      await auth().createUserWithEmailAndPassword(data.email, data.password);
    } else {
      Alert.alert(res.data, "Please try again", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    }
  };

  const login = async ({ data }) => {
    const res = await userLogin({ data: data });

    if (res.status === 200) {
      const responseData = res.data;

      setIsLoading(true);
      setUserInfo(responseData);
      setUserToken(responseData.token);

      AsyncStorage.setItem("userInfo", JSON.stringify(responseData));
      AsyncStorage.setItem("userToken", JSON.stringify(responseData.token));

      setIsLoading(false);
    } else {
      const confirmation = await auth().signInWithEmailAndPassword(
        data.email,
        data.password
      );
      const userInfo = confirmation.user;
      const userToken = await userInfo.getIdToken(true)

      if (userInfo) {
        setIsLoading(true);
        setUserInfo(userInfo);
        setUserToken(userToken);

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", JSON.stringify(userToken));

        setIsLoading(false);
      } else {
        Alert.alert(res.data, "Please try again with another password", [
          {
            text: "Try again",
            style: "cancel",
          },
        ]);
      }
    }
  };

  const loginWithGoogle = async () => {
    configureGoogleSignIn();

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setIsLoading(true);
      setUserInfo(userInfo.user);
      setUserToken(userInfo.idToken);

      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.user));
      AsyncStorage.setItem("userToken", JSON.stringify(userInfo.idToken));

      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  const resetPasswordWithPhone = async ({ phoneNumber }) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error("Sending code: ", error);
    }
  };

  const resetPasswordWithEmail = async ({ email }) => {
    try {
      await auth().sendPasswordResetEmail(email);
      alert("Password reset email sent");
    } catch (error) {
      alert(error);
    }
  };

  const confirmCode = async ({ code }) => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      console.log(user.uid);

      if (userDocument.exists) {
        return true;
      } else {
        const name = useState("Thien");
        await firestore().collection("users").doc(user.uid).set({
          name,
        });

        return false;
      }
    } catch (error) {
      console.error("Invalid code: ", error);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");

    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();

    setIsLoading(false);
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem("userInfo");
        let userToken = await AsyncStorage.getItem("userToken");
        userInfo = JSON.parse(userInfo);

        console.log(userToken)

        if (userInfo) {
          setUserInfo(userInfo);
          setUserToken(userToken);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("isLoggedIn error: ", error);
      }
    };

    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        loginWithGoogle,
        logout,
        register,
        resetPasswordWithPhone,
        resetPasswordWithEmail,
        confirmCode,
        isLoading,
        userToken,
        userInfo,
        confirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
