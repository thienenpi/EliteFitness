import React, { useContext, useState } from "react";
import { View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/resetPassword.style";
import { CountryCode, CustomButton, InputField } from "../components";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const { resetPasswordWithOTP, confirmCode, confirm } =
    useContext(AuthContext);
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
                await resetPasswordWithOTP({
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
        onPress={() => {
          resetPasswordWithOTP({ phoneNumber: phoneNumber });
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
