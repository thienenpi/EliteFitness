import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, Modal, StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, SIZES } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const AppNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Modal transparent={true} visible={isLoading} animationType="fade">
        <ActivityIndicator
          style={styles.loader}
          size={SIZES.xxLarge}
          color={COLORS.btn}
        ></ActivityIndicator>
      </Modal>

      <Stack.Navigator>
        {userToken !== null ? (
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
