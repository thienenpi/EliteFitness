import React, { useState } from "react";
import { View, Text } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { COLORS } from "../../constants";

const CalendarPicker = ({ onDataSelected }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState("");

  const handleDateSelected = (date) => {
    setSelectedDate(date);

    if (!hasDataForDate(date)) {
      setNoDataMessage("Không có dữ liệu cho ngày này");
    } else {
      // Gọi hàm callback và truyền dữ liệu
      onDataSelected(date);
      setNoDataMessage("");
    }
  };

  const hasDataForDate = (date) => {
    return true; // Change the logic based on your requirements
  };

  return (
    <View>
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
        onDateSelected={handleDateSelected}
      />
    </View>
  );
};

export default CalendarPicker;
