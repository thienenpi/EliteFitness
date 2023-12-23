import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "../components/history_log/Calendar";
import ExerciseRecord from "../components/history_log/ExerciseRecord"; // Điều chỉnh đường dẫn tới ExerciseRecord
import { COLORS } from "../constants";
import styles from "./styles/log.style";

const Log = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState("");

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
        <Text style={styles.userTxt}>Buu Buu</Text>
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
              fontFamily: " Animated.ViewBold",
            }}
          >{`Ngày đã chọn: ${selectedDate.format("DD/MM/YYYY")}`}</Text>
        </View>
      )}
      {noDataMessage !== "" && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "red" }}>{noDataMessage}</Text>
        </View>
      )}
      //FIXME: Truyền selectedDate cho ExerciseRecord
      <ExerciseRecord selectedDay={selectedDate} />
    </View>
  );
};

export default Log;
