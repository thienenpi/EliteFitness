import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
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
  const {
    resetPasswordWithPhone,
    resetPasswordWithEmail,
    confirmCode,
    confirm,
  } = useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigation = useNavigation();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return !confirm ? (
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
          await resetPasswordWithPhone({ phoneNumber: phoneNumber });
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
      <InputField
        label={"OTP code"}
        styles={styles}
        value={code}
        onChangeText={(text) => setCode(text)}
      ></InputField>

      <View style={{ height: 20 }}></View>

      <CustomButton
        onPress={async () => {
          const isExist = await confirmCode({ code: code });
          if (isExist) {
            navigation.navigate("Login");
          } else {
            console.log("not exist");
          }
        }}
        styles={styles}
        label={"Confirm"}
        isValid={code.length >= 6}
      ></CustomButton>
    </View>
  );
};

export default ResetPassword;
