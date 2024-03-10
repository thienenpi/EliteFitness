import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Setting from '../components/profile/Setting';
import User from '../components/profile/User';
import styles from './styles/profile.style';
import { CustomButton } from '../components/';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <ScrollView style={styles.container}>
      <User></User>
      <Setting></Setting>

      <CustomButton
        label={'LOG OUT'}
        styles={styles}
        isValid={true}
        onPress={logout}
      ></CustomButton>
    </ScrollView>
  );
};

export default Profile;
