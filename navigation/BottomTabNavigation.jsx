import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/index"
import { Home, Search, Profile } from "../screens"

// Create Bottom Tab Navigatior
const Tab = createBottomTabNavigator()

// Config screen options
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
}

const BottomTabNavigation = () => {
  // Create Tab Screen for each screen you want it appear at the
  // bottom tab navigation
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              <Ionicons
                name={focus ? "home" : "home-outline"}
                size={24}
                color={focus ? COLORS.primary : COLORS.gray2}
              />
            )
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              <Ionicons
                name="search-sharp"
                size={24}
                color={focus ? COLORS.primary : COLORS.gray2}
              />
            )
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              <Ionicons
                name={focus ? "person" : "person-outline"}
                size={24}
                color={focus ? COLORS.primary : COLORS.gray2}
              />
            )
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
