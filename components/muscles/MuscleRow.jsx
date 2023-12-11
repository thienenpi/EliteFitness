import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native"
import React, { useState } from "react"
import styles from "./muscleRow.style"
import { COLORS, SIZES } from "../../constants"
import MuscleCardView from "./MuscleCardView"
import useFetch from "../../hook/useFetch"
import Button from "../Button"

const MuscleRow = ({ onUpdateSelectedMuscles }) => {
  const { data, isLoading, error } = useFetch({ collection: "muscles" })
  const [selectedMuscles, setSelectedMuscles] = useState([])

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMusclePress(item.title)}>
      <MuscleCardView
        item={item}
        isSelected={selectedMuscles.includes(item.title)}
      ></MuscleCardView>
    </TouchableOpacity>
  )

  const handleMusclePress = (itemId) => {
    setSelectedMuscles((prevSelectedMuscles) => {
      const isIncluded = prevSelectedMuscles.includes(itemId)

      if (isIncluded) {
        // If already selected, remove it
        return prevSelectedMuscles.filter((id) => id !== itemId)
      } else {
        // If not selected, add it
        return [...prevSelectedMuscles, itemId]
      }
    })
  }

  const generateExercise = async () => {
    onUpdateSelectedMuscles(selectedMuscles)
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size={SIZES.xxLarge}
          color={COLORS.btn}
        ></ActivityIndicator>
      ) : error ? (
        <Text>Some thing went wrong</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          keyExtractor={(item) => JSON.stringify(item._id)}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      )}

      <Button
        styles={styles}
        onPress={generateExercise}
        title={"Generate"}
        isValid={selectedMuscles.length}
      ></Button>
    </View>
  )
}

export default MuscleRow
