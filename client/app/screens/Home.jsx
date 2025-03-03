// Type 'rnfes' for quick-setup
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Import external style.js file
import styles from "./styles/home.style";

import { COLORS, HOST_NODEJS } from "../constants";
import MuscleRow from "../components/muscles/MuscleRow";
import ExerciseColumn from "../components/exercises/ExerciseColumn";
import axios from "axios";
import Welcome from "../components/home/Welcome";
import FilterRow from "../components/home/FilterRow";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const showNotImplementedAlert = () => {
  alert("This feature is not implemented yet.");
};

const Home = () => {
  const [foundExercises, setFoundExercises] = useState([]);
  const { setIsLoading } = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const TOKEN = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          `${HOST_NODEJS}exercises/search/${searchKey || ""}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        setFoundExercises(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    if (searchKey) {
      fetchData();
    }
  }, [searchKey]);

  const updateSelectedMuscles = async (muscles) => {
    setSearchKey(muscles.join("&"));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ paddingTop: 48 }}></SafeAreaView>
      <Welcome></Welcome>
      <View style={styles.guideContainer}>
        <Image
          source={require("../../assets/icons/greater/3x.png")}
          style={styles.sideIcon}
        ></Image>
        <Text style={styles.guideTxt}>SELECT YOUR TRAINING</Text>
        <Image
          source={require("../../assets/icons/lower/3x.png")}
          style={styles.sideIcon}
        ></Image>
      </View>
      {/* <FilterRow></FilterRow> */}
      <View style={styles.muscleContainer}>
        <View style={styles.muscleHeader}>
          <Text style={styles.title}>Target Muscle</Text>
          {/* <TouchableOpacity onPress={showNotImplementedAlert}>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="plus-circle-outline"
            ></MaterialCommunityIcons>
          </TouchableOpacity> */}
        </View>
        <MuscleRow onUpdateSelectedMuscles={updateSelectedMuscles}></MuscleRow>
      </View>
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.title}>Exercise</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Generate Exercises")}
          >
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="plus-circle-outline"
            ></MaterialCommunityIcons>
          </TouchableOpacity> */}
        </View>
        <ExerciseColumn items={foundExercises}></ExerciseColumn>
      </View>
    </View>
  );
};

export default Home;
