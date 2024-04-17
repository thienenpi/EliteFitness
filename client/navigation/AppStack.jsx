import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomTabNavigation";
import {
  Practice,
  CreateExercise,
  BodyScan,
  ProductDetails,
  Shop,
  Cart,
  Payment,
} from "../screens";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Practice"
        component={Practice}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="CreateExercise"
        component={CreateExercise}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="BodyScan"
        component={BodyScan}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStack;
