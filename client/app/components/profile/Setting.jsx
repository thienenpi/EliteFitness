import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./setting.style";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const gymEquipmentOptions = [
  {
    header: "Available equipment",
    selected: "68 Selected",
    desc: "Perform exercises based on the available equipment at your gym, work, or home.",
  },
  // Add more gym equipment options if needed
];

const workoutSettingOptions = [
  {
    header: "Fitness Goal",
    selected: "General Fitness",
    desc: "Perform exercises based on the available equipment at your gym, work, or home.",
  },
  {
    header: "Fitness Experience",
    selected: "Beginner",
    desc: "Perform exercises based on the available equipment at your gym, work, or home.",
  },
  {
    header: "Cardio Recommendation",
    selected: "Off",
    desc: "Perform exercises based on the available equipment at your gym, work, or home.",
  },
  {
    header: "Workout Duration",
    selected: "1 Hour",
    desc: "Perform exercises based on the available equipment at your gym, work, or home.",
  },
];

const SettingOption = ({ header, selected, desc }) => {
  return (
    <View style={styles.optionItem}>
      <View style={styles.header}>
        <Text style={styles.optionHeader}>{header}</Text>
        <TouchableOpacity style={styles.selectedContainer}>
          <Text style={styles.optionSelected}>{selected}</Text>
          <Entypo size={14} color={COLORS.paragraphBg} name="chevron-right" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.optionDesc}>{desc}</Text>
      </View>
    </View>
  );
};

const Forward = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.optionItem}>
      <View style={styles.header}>
        <Text style={styles.optionDesc}>
          Generate inbody test with camera by clicking the shape beside.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("BodyScan")}>
          <Ionicons
            name="body-outline"
            size={32}
            color={COLORS.warning200}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingSection = ({ title, options }) => {
  return (
    <View style={styles.guideContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity>
          <AntDesign size={16} color={COLORS.btn} name="questioncircle" />
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        {options !== null ? (
          options.map((option, index) => (
            <SettingOption key={index} {...option} />
          ))
        ) : (
          <Forward />
        )}
      </View>
    </View>
  );
};

const Setting = () => {
  return (
    <View style={styles.container}>
      <SettingSection title="Gym equipment" options={gymEquipmentOptions} />
      <SettingSection title="Workout Setting" options={workoutSettingOptions} />
      <SettingSection title="Inbody Test with Camera" options={null} />
    </View>
  );
};

export default Setting;
