import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/resetPassword.style";
import { CountryCode, CustomButton, InputField } from "../components";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const ResetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    resetPasswordWithPhone,
    resetPasswordWithEmail,
    confirmCode,
    confirm,
    setConfirm,
  } = useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigation = useNavigation();
  const checkPasswordsMatch = (newPassword, confirmPassword) => {
    return (
      newPassword === confirmPassword &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    );
  };
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return confirm ? (
    <View style={styles.container}>
      <InputField
        icon={<CountryCode onCountryChange={handleCountryChange}></CountryCode>}
        label={"Phone Number"}
        styles={styles}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        onSubmitEditing={
          phoneNumber.length >= 10
            ? async () => {
                let callingCode = selectedCountry.callingCode[0];
                callingCode = callingCode.replace(/\["|"\]/g, "");
                await resetPasswordWithPhone({
                  phoneNumber: `+${callingCode}${phoneNumber}`,
                });
              }
            : () => {}
        }
      ></InputField>

      <View style={{ height: 20 }}></View>

      <CustomButton
        label={"Send code"}
        styles={styles}
        isValid={phoneNumber.length >= 10}
        onPress={async () => {
          let callingCode = selectedCountry.callingCode[0];
          callingCode = callingCode.replace(/\["|"\]/g, "");
          console.log(`+${callingCode}${phoneNumber}`);
          await resetPasswordWithPhone({
            phoneNumber: `+${callingCode}${phoneNumber}`,
          });
        }}
      ></CustomButton>

      <View style={{ paddingVertical: 10 }}>
        <Text>Or with email</Text>
      </View>

      <InputField
        icon={
          <Ionicons
            style={{ paddingRight: 10 }}
            name="mail"
            color={COLORS.text}
            size={24}
          ></Ionicons>
        }
        label={"Email"}
        styles={styles}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType={"email-address"}
        onSubmitEditing={async () => {
          await resetPasswordWithEmail({ email: email });
          navigation.navigate("Login");
        }}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <CustomButton
        label={"Change password"}
        styles={styles}
        isValid={true}
        onPress={async () => {
          await resetPasswordWithEmail({ email: email });
          navigation.navigate("Login");
        }}
      ></CustomButton>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      <InputField
        label={"OTP code"}
        styles={styles}
        value={code}
        onChangeText={(text) => setCode(text)}
        onSubmitEditing={async () => {
          const isExist = await confirmCode({ code: code });
          if (isExist) {
            setConfirm(null);
            navigation.navigate("Login");
          }
        }}
      ></InputField>
      <View style={{ height: 20 }}></View>
      <InputField
        label={"New Password"}
        styles={styles}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      ></InputField>
      <View style={{ height: 20 }}></View>
      <InputField
        label={"Confirm New Password"}
        styles={styles}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        isValid={checkPasswordsMatch(newPassword, confirmPassword)}
      ></InputField>

      <View style={{ height: 32 }}></View>
      <CustomButton
        onPress={async () => {
          const isExist = await confirmCode({ code: code });
          if (isExist) {
            setConfirm(null);
            navigation.navigate("Login");
          }
        }}
        styles={styles}
        label={"Confirm"}
        isValid={
          code.length >= 6 && checkPasswordsMatch(newPassword, confirmPassword)
        }
      ></CustomButton>
    </View>
  );
};

export default ResetPassword;
