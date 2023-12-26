import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'

const BackBtn = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={onPress}>
      <Ionicons name="chevron-back-circle" size={30} color={COLORS.btn}></Ionicons>
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    zIndex: 999
  }
})
