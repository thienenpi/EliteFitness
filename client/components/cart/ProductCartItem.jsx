import React, { useState } from "react";
import { Text, Image, TouchableOpacity, View, Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "./ProductCart.style";

const ProductCartItem = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      // If quantity is already 1, prompt for deletion
      Alert.alert(
        "Delete Item",
        "Are you sure you want to delete this item?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => deleteItem() },
        ],
        { cancelable: false }
      );
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const deleteItem = () => {
    // Implement deletion logic here
    // For now, let's just log a message
    console.log("Item deleted");
  };

  return (
    <TouchableOpacity style={styles.cartItemContainer}>
      <TouchableOpacity
        style={styles.CheckBox}
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          style={{ height: 20, width: 20 }}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </TouchableOpacity>
      <Image
        style={styles.productImage}
        source={require("../../assets/images/products/whey.png")}
      />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>Tên sản phẩm</Text>
        <Text style={styles.productCategory}>Phân loại sản phẩm</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>Giá SP</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity}>
              <Text style={styles.quantityBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <Text style={styles.quantityBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartItem;
