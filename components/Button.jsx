import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React from "react"
import { COLORS, SIZES } from "../constants"

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      style={styles.btn(isValid ? COLORS.btn : COLORS.text)}
      onPress={isValid ? onPress : () => {}}
      
    >
      {!loader ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btn: (backgroundColor) => ({
    height: 50,
    marginVertical: 10,
    marginHorizontal: SIZES.xxLarge * 2,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  }),
  btnText: {
    fontFamily: "sfProBlackItalic",
    color: COLORS.white,
    fontSize: 18,
  },
})
