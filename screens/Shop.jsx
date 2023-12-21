import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import styles from "./styles/shop.style";
import SearchBar from "../components/shop/search";
import { COLORS } from "../constants";
import Slider from "../components/shop/slider";
import ProductList from "../components/shop/productList";
import useFetch from "../hook/useFetch";

const Shop = () => {
  const [productList, setProductList] = useState(null)

  const updateProducts = (newProductList) => {
    setProductList(newProductList)
  }

  return (
    <View style={styles.container}>
      <View style={styles.shopContainer}>
        {/* Header */}
        <View>
          <TouchableOpacity>
            <SearchBar onUpdateProductList={updateProducts} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="bell-badge"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="cart"
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Slider />
        <ProductList items={productList}/>
      </ScrollView>
    </View>
  );
};

export default Shop;
