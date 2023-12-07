import { View, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import styles from "./styles/shop.style"
import SearchBar from "../components/shop/search"
import { COLORS } from "../constants"
import Slider from "../components/shop/slider"
import ProductList from "../components/shop/productList"

const Shop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shopContainer}>
        {/* Header */}
        <View>
          <TouchableOpacity>
            <SearchBar />
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
      
      <Slider />

      <ProductList />
    </View>
  )
}

export default Shop
