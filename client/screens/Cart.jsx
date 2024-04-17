import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./styles/cart.style";
import { ProductCartItem } from "../components";

const Cart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity>
          <AntDesign size={24} color={COLORS.btn} name="arrowleft"></AntDesign>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
        <TouchableOpacity>
          <FontAwesome5
            size={20}
            color={COLORS.btn}
            name="trash"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>

      <ProductCartItem></ProductCartItem>
    </View>
  );
};

export default Cart;
