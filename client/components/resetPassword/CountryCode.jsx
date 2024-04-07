import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CountryPicker, {
  CountryModalProvider,
} from "react-native-country-picker-modal";

const CountryCode = ({ onCountryChange }) => {
  const [countryCode, setCountryCode] = useState("VN"); // Mã quốc gia mặc định cho Việt Nam
  const [country, setCountry] = useState(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false); // State để kiểm soát hiển thị modal chọn quốc gia

  const onSelectCountry = (country) => {
    setCountry(country);
    setCountryCode(country.cca2);
    setShowCountryPicker(false);
    onCountryChange(country);
  };

  useEffect(() => {
    const defaultCountry = { cca2: "VN", callingCode: ["84"] };
    onSelectCountry(defaultCountry);
  }, []);

  return (
    <CountryModalProvider>
      <View style={{ paddingRight: 10 }}>
        <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
          <View>
            <Text>{country ? `+${country.callingCode}` : "+XX"}</Text>
          </View>
        </TouchableOpacity>
        {showCountryPicker && (
          <CountryPicker
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              withCountryNameButton: true,
              withAlphaFilter: true,
              onSelect: onSelectCountry,
              modalProps: {
                visible: true,
              },
            }}
          />
        )}
      </View>
    </CountryModalProvider>
  );
};

export default CountryCode;
