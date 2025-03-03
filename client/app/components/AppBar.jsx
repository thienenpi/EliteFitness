import React from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, TEXTS } from "../constants";

const AppBar = ({
  title,
  showLeftIcon = true,
  showRightIcon,
  rightIconName,
  rightIconStyle,
  onPressLeftIcon,
  onPressRightIcon,
}) => {
  return (
    <LinearGradient
      style={[
        styles.header,
        { paddingTop: Platform.OS === "android" ? 40 : 60 },
      ]}
      colors={COLORS.linearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerContent}>
        {showLeftIcon && (
          <Pressable onPress={onPressLeftIcon}>
            <Ionicons name="arrow-back" style={styles.iconLeft} />
          </Pressable>
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {showRightIcon && (
        <Pressable onPress={onPressRightIcon}>
          <Ionicons
            name={rightIconName}
            style={[styles.iconRight, rightIconStyle]}
          />
        </Pressable>
      )}
    </LinearGradient>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: COLORS.primaryBg,
  },

  headerContent: {
    paddingVertical:12,
    paddingBottom:24,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },

  headerText: {
    // fontSize: 20,
    // marginLeft: 16,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    fontSize: TEXTS.price.fontSize,
    textTransform: "uppercase",
  },

  iconRight: {
    fontSize: 20,
    color: COLORS.white,
  },

  iconLeft: {
    fontSize: 22,
    color: COLORS.white,
  },
});
