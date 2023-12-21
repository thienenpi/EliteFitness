import { FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './filterRow.style'
import { SIZES } from '../../constants'
import FilterListView from './FilterListView'

const FilterRow = () => {
  const filterField = [
    {
      label: 'Workout duration',
      values: ['1 hr', '15 min', '30 min', '45 min']
    },
    {
      label: 'Equipment',
      values: ['Dumbbells', 'Barbells', 'Kettlebells']
    },
    {
      label: 'Level',
      values: ['Beginner', 'Advanced', 'Intermediate']
    },
    {
      label: 'Muscle splits',
      values: ['Recoverd muscles', 'Push muscles', 'Pull muscles']
    }
  ]

  const renderItem = ({ item }) => <FilterListView item={item}></FilterListView>

  return (
    <View style={styles.container}>
      <FlatList
        data={filterField}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => JSON.stringify(item.label)}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  )
}

export default FilterRow
