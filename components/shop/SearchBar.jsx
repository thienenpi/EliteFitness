import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, IP_ADDRESS } from "../../constants";
import styles from "./searchBar.style";
import axios from "axios";

const SearchBar = ({ onUpdateProductList }) => {
  const [searchKey, setSearchKey] = useState(null);
  const [seacrhResult, setSearchResult] = useState(null);

  const fetch = async () => {
    try {
      const endPoint = `http://${IP_ADDRESS}:3000/api/products/search/${
        searchKey || ""
      }`;
      const response = await axios.get(endPoint);
      setSearchResult(response.data);
      onUpdateProductList(seacrhResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchKey) {
      fetch();
    }
  }, [searchKey]);

  const handleEnterPress = () => {
    if (searchKey) {
      fetch();
    }
  };

  const handleSearchPress = () => {
    if (searchKey) {
      fetch();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSearchPress} style={styles.searchBtn}>
        <Ionicons size={28} color={COLORS.btn} name="search-circle"></Ionicons>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchKey(text)}
        value={searchKey}
        placeholder="Search"
        onSubmitEditing={handleEnterPress}
      />
    </View>
  )
}

export default SearchBar
