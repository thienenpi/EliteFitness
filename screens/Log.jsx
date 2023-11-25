import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import React from "react";
import styles from "./styles/log.style";
import { COLORS } from "../constants";

const Log = () => {
  return (
    // https://github.com/BugiDev/react-native-calendar-strip
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userTxt}>Buu Buu</Text>
        <TouchableOpacity>
          <Feather size={24} color={COLORS.btn} name="settings"></Feather>
        </TouchableOpacity>
      </View>

      <CalendarStrip
        scrollable
        style={{ height: 120, paddingTop: 14, paddingBottom: 10 }}
        calendarColor={COLORS.primaryBg}
        calendarHeaderStyle={{
          color: COLORS.btn,
          fontFamily: "rufner",
          textTransform: "uppercase",
        }}
        dateNumberStyle={{ color: COLORS.text }}
        dateNameStyle={{ color: COLORS.btn, fontSize: 10 }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
};

export default Log;
