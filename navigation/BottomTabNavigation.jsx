import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants/index";
import { ChatBot, Home, Log, Profile, Shop } from "../screens";

// Create Bottom Tab Navigatior
const Tab = createBottomTabNavigator();

// Config screen options
const screenOptions = {
  // tabBarShowLabel: true,
  // tabBarHideOnKeyboard: true,
  // headerShown: false,
  // tabBarStyle: {
  //   position: "absolute",
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   elevation: 0,
  //   height: 80,
  //   backgroundColor: "black",
  //   paddingTop: 8,
  // },
  headerShown: false,
  tabBarActiveTintColor: "#F8C06D",
  tabBarInactiveTintColor: "#7C7773",
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarStyle: [
    {
      display: "flex",
      backgroundColor: "black",
    },
    null,
  ],
};

const BottomTabNavigation = () => {
  // Create Tab Screen for each screen you want it appear at the
  // bottom tab navigation

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              <Ionicons name="md-home" size={24} color={COLORS.btn} />
              // <Ionicons
              //   name={focus ? "home" : "home-outline"}
              //   size={24}
              // color={focus ? COLORS.primary : COLORS.gray2}
              // />
            );
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Log"
        component={Log}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              // <Ionicons
              //   name="search-sharp"
              //   size={24}
              //   color={focus ? COLORS.primary : COLORS.gray2}
              // />
              <FontAwesome name="dashboard" size={24} color={COLORS.btn} />
            );
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Chatbot"
        component={ChatBot}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              // <Ionicons
              //   name={focus ? "person" : "person-outline"}
              //   size={24}
              //   color={focus ? COLORS.primary : COLORS.gray2}
              // />
              <Ionicons name="chatbox-ellipses" size={24} color={COLORS.btn} />
            );
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              // <Ionicons
              //   name={focus ? "home" : "home-outline"}
              //   size={24}
              //   color={focus ? COLORS.primary : COLORS.gray2}
              // />
              <FontAwesome5 name="shopping-cart" size={24} color={COLORS.btn} />
            );
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focus }) => {
            return (
              <FontAwesome5 name="user-circle" size={24} color={COLORS.btn} />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
