import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./exerciseColumn.style"
import { COLORS, SIZES } from "../../constants"
import ExerciseCardView from "./ExerciseCardView"

const ExerciseColumn = ({ items }) => {
  const isLoading = false,
    error = false
  const renderItem = ({ item }) => (
    <ExerciseCardView item={item}></ExerciseCardView>
  )

  return (
    <View style={styles.container}>
      {!items.length ? (
        <Text style={styles.guideTxt}>
          Choose Target Muscle then click Generate to get your Exercises{" "}
        </Text>
      ) : isLoading ? (
        <ActivityIndicator
          size={SIZES.xxLarge}
          color={COLORS.primaryBg}
        ></ActivityIndicator>
      ) : error ? (
        <Text>Some thing went wrong</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        ></FlatList>
      )}
    </View>
  )
}

export default ExerciseColumn
