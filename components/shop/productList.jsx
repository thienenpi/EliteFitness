import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./productList.style";
import ProductCard from "./product";
const ProductList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Recommend for you</Text>
      <ProductCard />
    </View>
  );
};

export default ProductList;
