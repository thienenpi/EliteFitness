import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React from "react"
import { COLORS, SIZES } from "../constants"

const Button = ({ styles, title, onPress, isValid, loader }) => {
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