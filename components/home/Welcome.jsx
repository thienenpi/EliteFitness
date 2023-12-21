import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './welcome.style'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icons/profile/3x.png')}
          style={styles.profileImage}
        ></Image>
      </TouchableOpacity>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTxt}>GOOD MORNING</Text>
        <Text style={styles.userName}>BUU BUU</Text>
      </View>
      <TouchableOpacity style={{ width: 52 }}>
        <Image
          source={require('../../assets/icons/setting/3x.png')}
          style={styles.settingIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  )
}

export default Welcome
