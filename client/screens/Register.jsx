import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import LinearGradient from "react-native-linear-gradient";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { AuthContext } from "../context/AuthContext";
import { styles1, styles2, googleButton } from "./styles/register.style";
import { COLORS } from "../constants";

const hideKeyboard = () => {
  Keyboard.dismiss();
};

const Register = () => {
  const navigation = useNavigation();
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(showConfirmPassword  ? false : true);
  };

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    login({ data: data });
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <LinearGradient
        colors={["#0E403D", "#00B7AF"]}
        style={styles1.linearGradient}
      >
        <View style={styles1.container}>
          <Text style={styles1.headerText}>SIGN UP</Text>
          <View style={{ height: 42 }}></View>
          <InputField
            icon={
              <Ionicons name="mail" color={COLORS.primary} size={24}></Ionicons>
            }
            styles={styles1}
            label={"Email"}
            keyboardType={"email-address"}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            onSubmitEditing={handleSubmit}
          ></InputField>
          <View style={{ height: 20 }}></View>
          <View>
            <InputField
              icon={
                <Ionicons
                  name="keypad"
                  size={24}
                  color={COLORS.primary}
                ></Ionicons>
              }
              styles={styles1}
              label={"Password"}
              // inputType={"password"}
              inputType={showPassword ? 'default' : 'password'}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles1.iconContainer}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }}></View>
          <View>
            <InputField
              icon={
                <Ionicons
                  name="keypad"
                  size={24}
                  color={COLORS.primary}
                ></Ionicons>
              }
              styles={styles1}
              label={"Confirm Password"}
              inputType={showConfirmPassword ? 'default' : 'password'}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={styles1.iconContainer}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: 42 }}></View>
          <CustomButton
            styles={styles1}
            isValid={true}
            label={"SIGN UP"}
            color={{ color: COLORS.black }}
            onPress={() => {
              handleSubmit();
            }}
          ></CustomButton>
          <View
            style={{
              height: 20,
              marginTop: 28,
              display: "flex",
              flexDirection: "row",
              gap: 32,
            }}
          >
            <Text style={styles1.smallText}>Already have an account</Text>
            <TouchableOpacity
              isValid={true}
              styles={styles1}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles1.smallText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Register;
