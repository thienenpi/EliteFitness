import { Image, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import styles from "./exerciseCardView.style"
import { useNavigation } from "@react-navigation/native"

const ExerciseCardView = ({ item }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Practice", { item })}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.imageUrl }}></Image>
        <View style={styles.details}>
          <Text style={styles.title}> {item.title}</Text>
          <Text style={styles.description}>
            {item.numOfSet} sets | {item.numOfRep} reps
          </Text>
        </View>

        <View style={styles.btnColumn}>
          <TouchableOpacity>
            <Image
              style={styles.btn}
              source={require("../../assets/icons/trash/3x.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.btn}
              source={require("../../assets/icons/transger/3x.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ExerciseCardView
