import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
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
import { styles1, googleButton } from "./styles/login.style";
import { COLORS } from "../constants";

const hideKeyboard = () => {
  Keyboard.dismiss();
};

const Login = () => {
  const navigation = useNavigation();
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "default");
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
          <Text style={styles1.headerText}>LOG IN</Text>
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
              inputType={inputType}
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

          <View style={{ height: 42 }}></View>
          <CustomButton
            styles={styles1}
            isValid={true}
            label={"LOGIN"}
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
            <Text style={styles1.smallText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles1.smallText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }}></View>

          <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
            <Text style={styles1.forgotPassText}>Forgot password?</Text>
          </TouchableOpacity>

          <View
            style={{
              height: 20,
              marginTop: 28,
              marginBottom: 12,
              width: "80%",
              borderTopColor: COLORS.exerciseBg,
              borderTopWidth: 1,
            }}
          ></View>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={loginWithGoogle}
            style={googleButton.btnContainer}
          ></GoogleSigninButton>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Login;
