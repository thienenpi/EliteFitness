import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./styles/cart.style";
import { CustomButton, ProductCartList } from "../components";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductById } from "../api/ProductApi";

const Cart = () => {
  const [productCartList, setProductCartList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [productCartList]);

  // Load cart data from AsyncStorage

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      const TOKEN = await AsyncStorage.getItem("userToken");
      if (cartData !== null) {
        const parsedCartData = JSON.parse(cartData);

        parsedCartData.forEach((item) => {
          const productID = item._id;
          const quantity = item.quantity;

          // Get product details from API using productID
          getProductById({ id: productID, token: TOKEN }).then((data) => {
            // console.log(data.data);
            // set product details with quantity
            setProductCartList((prev) => [...prev, { ...data.data, quantity }]);
          });
        });
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const saveCart = async () => {
    try {
      //   await AsyncStorage.setItem("cart", JSON.stringify(productCartList));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem("cart");
    setProductCartList([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign size={24} color={COLORS.btn} name="arrowleft"></AntDesign>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
        <TouchableOpacity onPress={() => clearCart()}>
          <FontAwesome5
            size={20}
            color={COLORS.btn}
            name="trash"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>

      <ProductCartList items={productCartList}></ProductCartList>


    </View>
  );
};

export default Cart;
