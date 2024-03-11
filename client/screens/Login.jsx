import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { AuthContext } from "../context/AuthContext";
import { styles1, styles2 } from "./styles/login.style";
import { COLORS } from "../constants";

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    login({ data: data });
  };

  return (
    <View style={styles1.container}>
      <Text style={styles1.headerText}>LOG IN</Text>
      <View style={{ height: 42 }}></View>
      <InputField
        icon={
          <Ionicons
            name="mail"
            color={COLORS.secondary500}
            size={24}
          ></Ionicons>
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
      <InputField
        icon={<Ionicons name="keypad" size={24}></Ionicons>}
        styles={styles1}
        label={"Password"}
        inputType={"password"}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        onSubmitEditing={handleSubmit}
      ></InputField>
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
        <TouchableOpacity
          isValid={true}
          styles={styles1}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles1.smallText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }}></View>
      <Text style={styles1.forgotPassText}>Forgot password?</Text>

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

      <CustomButton
        icon={<Ionicons name="logo-google" size={16}></Ionicons>}
        styles={styles2}
        isValid={true}
        label={"Continue with Google"}
        onPress={() => {
          handleSubmit();
        }}
      ></CustomButton>
    </View>
  );
};

export default Login;
