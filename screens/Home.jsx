// Type 'rnfes' for quick-setup
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
// Import external style.js file
import styles from "./styles/home.style"

import { COLORS } from "../constants"
import MuscleRow from "../components/muscles/MuscleRow"
import ExerciseColumn from "../components/exercises/ExerciseColumn"
import axios from "axios"

const Home = () => {
  const [foundExercises, setFoundExercises] = useState([])
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/exercises/search/${searchKey || ""}`
        )
        setFoundExercises(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [searchKey])

  const updateSelectedMuscles = async (muscles) => {
    setSearchKey(muscles.join("&"))
  }

  return (
    <View style={styles.container}>
      <View style={styles.muscleContainer}>
        <View style={styles.muscleHeader}>
          <Text style={styles.title}>Target Muscle</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="plus-circle-outline"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <MuscleRow onUpdateSelectedMuscles={updateSelectedMuscles}></MuscleRow>
      </View>
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.title}>Exercise</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="plus-circle-outline"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <ExerciseColumn items={foundExercises}></ExerciseColumn>
      </View>
    </View>
  )
}

export default Home
