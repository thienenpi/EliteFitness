import { Image, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./muscleCardView.style"
import { COLORS } from "../../constants"

const MuscleCardView = ({ item, isSelected }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (item.imageUrl && item.imageUrl !== "none") {
      setIsLoading(false)
    }
  }, [item.imageUrl])

  return (
    <View style={styles.container}>
      <View
        style={styles.imageContainer(
          isSelected ? COLORS.paragraphBg : COLORS.text
        )}
      >
        {isLoading ? (
          <Text> None </Text>
        ) : (
          <Image
            style={styles.image}
            source={{uri: item.imageUrl}}
          ></Image>
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.title}> {item.title} </Text>
      </View>
    </View>
  )
}

export default MuscleCardView
