import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { Switch } from 'react-native'

const SettingRow = ({ title, styles, iconName, onChange, value }) => {
  return (
    <View style={styles.settingContainer}>
      <MaterialCommunityIcons name={iconName} size={20} color={COLORS.btn}></MaterialCommunityIcons>
      <Text style={styles.settingTxt}> {title} </Text>
      <Switch
        trackColor={{ true: COLORS.exerciseBg, false: COLORS.text }}
        thumbColor={value ? COLORS.btn : COLORS.text}
        onChange={onChange}
        value={value}
        style={styles.switchBtn}
      ></Switch>
    </View>
  )
}

export default SettingRow
