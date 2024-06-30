import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './filterListView.style'
import { Picker } from '@react-native-picker/picker'

const FilterListView = ({ item }) => {
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.labelTxt}>{item.label}</Text>
      <View style={{ width: 5 }}></View>
      {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
      >
        {item.values.map((value, index) => (
          <Picker.Item value={value} key={index} label={value}></Picker.Item>
        ))}
      </Picker> */}
      <Image
        source={require('../../../assets/icons/dropdown/3x.png')}
        style={styles.dropdownIcon}
      ></Image>
    </View>
  )
}

export default FilterListView
