import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./productList.style"
import ProductCard from "./ProductCardView"
import useFetch from "../../hook/useFetch"
import { COLORS, SIZES } from "../../constants"

const ProductList = ({ items }) => {
  const { data, isLoading, error } = useFetch({ collection: "products" });
  const [productList, setProductList] = useState(data);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <ProductCard item={item}></ProductCard>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (items && items.length) {
      setProductList(items);
    } else {
      setProductList(data);
    }
  }, [items, data]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Recommend for you</Text>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.btn}></ActivityIndicator>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={productList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        ></FlatList>
      )}
    </View>
  );
};

export default ProductList;
