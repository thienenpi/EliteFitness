import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './product.style'

// Hàm chuyển đổi số thành chuỗi có định dạng ***.***VNĐ
const formatPrice = (price) => {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formattedPrice} VNĐ`
}

const ProductCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.productContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImg}></Image>
        <Text style={styles.productTitle}>
          {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
        </Text>
        {/* <Text style={styles.productTitle}>{item.title}</Text> */}
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductCard
