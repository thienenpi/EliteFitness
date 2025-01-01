import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ProductList from "../components/shop/ProductList";
import SearchBar from "../components/shop/SearchBar";
import Slider from "../components/shop/Slider";
import { COLORS } from "../constants";
import styles from "./styles/shop.style";
import { useNavigation } from "@react-navigation/native";

const Shop = () => {
  const [productList, setProductList] = useState(null);
  const navigation = useNavigation();

  const updateProducts = (newProductList) => {
    setProductList(newProductList);
  };

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
          {/* <TouchableOpacity>
            <MaterialCommunityIcons
              size={24}
              color={COLORS.btn}
              name="bell-badge"
            ></MaterialCommunityIcons>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
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
        <ProductList items={productList} />
      </ScrollView>
    </View>
  );
};

export default Shop;
