import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../components";
import ProductSlider from "../components/shop/ProductDetailsSlider";
import SearchBar from "../components/shop/SearchBar";
import { COLORS } from "../constants";
import styles from "./styles/productDetails.style";

const ProductDetails = () => {
  const [productList, setProductList] = useState(null);
  const navigation = useNavigation();
  const updateProducts = (newProductList) => {
    setProductList(newProductList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.shopContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
              <AntDesign
                size={24}
                color={COLORS.btn}
                name="arrowleft"
              ></AntDesign>
            </TouchableOpacity>
            <TouchableOpacity>
              <SearchBar onUpdateProductList={updateProducts} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
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
      </View>

      <ProductSlider />

      {/* Details */}
      {/* TODO: chen thong tin san pham */}
      <View style={{ marginHorizontal: 12 }}>
        <Text style={styles.productName}>Product Name</Text>
        <Text style={styles.productPrice}>Product Price</Text>
        <View style={styles.ratingContainer}>
          <TouchableOpacity style={{ marginVertical: 4 }}>
            <AntDesign size={16} color={COLORS.btn} name="star"></AntDesign>
          </TouchableOpacity>
          <Text style={styles.ratingLevel}>4.8/5</Text>
          <Text style={styles.quantitySold}>Sold 1000+</Text>
        </View>
        <Text style={styles.description}>Product description</Text>
      </View>

      <CustomButton
        styles={styles}
        // TODO: thuc hien them vao gio hang
        // onPress={}
        icon={
          <AntDesign
            size={16}
            color={COLORS.neutral100}
            name="shoppingcart"
          ></AntDesign>
        }
        label={"Add to cart"}
      ></CustomButton>
    </View>
  );
};

export default ProductDetails;
