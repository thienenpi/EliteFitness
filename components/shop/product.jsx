import { View, Text, TouchableOpacity, Image } from "react-native"
import React from "react"
import styles from "./product.style"

const ProductCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.productContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImg}
        ></Image>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price} VNĐ</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductCard
