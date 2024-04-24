import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../components";
import ProductSlider from "../components/shop/ProductDetailsSlider";
import SearchBar from "../components/shop/SearchBar";
import { COLORS } from "../constants";
import styles from "./styles/productDetails.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = () => {
  const [productList, setProductList] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const updateProducts = (newProductList) => {
    setProductList(newProductList);
  };

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [cart]);

  // Load cart data from AsyncStorage

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData !== null) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = ({ productID }) => {
    const existingItemIndex = cart.findIndex((item) => item._id === productID);

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item in the cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { _id: productID, quantity: 1 }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.shopContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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

            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
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
      <View style={{ marginHorizontal: 12 }}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price} VND</Text>
        <View style={styles.ratingContainer}>
          <TouchableOpacity style={{ marginVertical: 4 }}>
            <AntDesign size={16} color={COLORS.btn} name="star"></AntDesign>
          </TouchableOpacity>
          <Text style={styles.ratingLevel}>4.8/5</Text>
          <Text style={styles.quantitySold}>Sold 1000+</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <CustomButton
        styles={styles}
        // TODO: thuc hien them vao gio hang
        onPress={() => addToCart({ productID: item._id })}
        icon={
          <AntDesign
            size={16}
            color={COLORS.neutral100}
            name="shoppingcart"
          ></AntDesign>
        }
        label={"Add to cart"}
        isValid={true}
      ></CustomButton>
    </View>
  );
};

export default ProductDetails;
