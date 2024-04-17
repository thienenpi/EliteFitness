import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./styles/cart.style";
import { CustomButton, ProductCartItem } from "../components";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <View style={styles.body}>
        <View style={styles.productItems}>
          <ScrollView>
            <ProductCartItem></ProductCartItem>
          </ScrollView>
        </View>

        <View style={styles.footerBar}>
          <CustomButton
            onPress={() => navigation.navigate("Payment")}
            label={"PAYMENT"}
            styles={styles}
            isValid={true}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};

export default Cart;
