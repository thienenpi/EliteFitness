import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./product.style";
const ProductCard = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.productContainer}>
        <Image
          source={require("../../assets/images/products/whey.png")}
          style={styles.productImg}
        ></Image>
        <Text style={styles.productTitle}>
          ON Whey Gold Standard 100% Whey Protein, 5 Lbs
        </Text>
        <Text style={styles.productPrice}>400.000VNĐ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
