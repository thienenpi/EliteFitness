import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const CustomButton = ({ icon, styles, label, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer(isValid ? COLORS.btn : COLORS.text)}
      onPress={isValid ? onPress : () => {}}
    >
    {icon}
      {!loader ? (
        <Text style={styles.btnLabel}>{label}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
