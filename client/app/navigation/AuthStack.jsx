import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register, Onboarding, ResetPassword } from "../screens";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      ></Stack.Screen> */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Reset Password"
        component={ResetPassword}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
