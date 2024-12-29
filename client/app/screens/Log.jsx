import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "../components/log/CalendarPicker";
import ExerciseRecord from "../components/log/ExerciseRecord";
import { COLORS } from "../constants";
import styles from "./styles/log.style";
import { AuthContext } from "../context/AuthContext";

const Log = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState("");
  const { userInfo } = useContext(AuthContext);

  const onDataSelected = (date) => {
    setSelectedDate(date);

    if (!hasDataForDate(date)) {
      setNoDataMessage("Không có dữ liệu cho ngày này");
    } else {
      setNoDataMessage("");
    }
  };

  const hasDataForDate = (date) => {
    return true; // Change the logic based on your requirements
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userTxt}>{userInfo.name}</Text>
        <TouchableOpacity>
          <Feather size={24} color={COLORS.btn} name="settings" />
        </TouchableOpacity>
      </View>
      <CalendarPicker onDataSelected={onDataSelected} />
      {selectedDate && (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.paragraphBg,
              fontFamily: "poppinsBold",
              marginBottom: 20,
            }}
          >{`Selected date: ${selectedDate.format("DD/MM/YYYY")}`}</Text>
        </View>
      )}
      {noDataMessage !== "" && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "red" }}>{noDataMessage}</Text>
        </View>
      )}
      {/* FIXME: Truyền selectedDate cho ExerciseRecord */}
      <ExerciseRecord selectedDay={selectedDate} />
    </View>
  );
};

export default Log;
