import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import styles from './welcome.style';
import { AuthContext } from '../../context/AuthContext';

const Welcome = () => {
  const { userInfo } = useContext(AuthContext);

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
        <Text style={styles.userName}> {userInfo.name} </Text>
      </View>
      <TouchableOpacity style={{ width: 52 }}>
        <Image
          source={require('../../assets/icons/setting/3x.png')}
          style={styles.settingIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
