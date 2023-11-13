import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <TouchableOpacity>
      <ExerciseCardView item={item}></ExerciseCardView>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {!items.length ? (
        <Text>
          {" "}
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
        // <ScrollView>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => JSON.stringify(item._id)}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          ></FlatList>
        // </ScrollView>
      )}
    </View>
  )
}

export default ExerciseColumn
