import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import styles from './productList.style'
import ProductCard from './product'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES } from '../../constants'

const ProductList = () => {
  const { data, isLoading, error } = useFetch({ collection: 'products' })

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <ProductCard item={item}></ProductCard>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Recommend for you</Text>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.btn}></ActivityIndicator>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      )}
    </View>
  )
}

export default ProductList
