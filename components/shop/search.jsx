import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import styles from "./search.style";
const SearchBar = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <Ionicons size={28} color={COLORS.btn} name="search-circle"></Ionicons>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search"
      />
    </View>
  );
};

export default SearchBar;
