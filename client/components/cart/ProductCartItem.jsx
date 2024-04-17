import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "./ProductCart.style";

const ProductCartItem = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <TouchableOpacity style={styles.cartItemContainer}>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>Tên sản phẩm</Text>
        <Text style={styles.productCategory}>Phân loại sản phẩm</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>Giá SP</Text>
          <TouchableOpacity style={styles.quantityContainer}>
            <Text style={styles.quantity}>SL</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => setToggleCheckBox(!toggleCheckBox)}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCartItem;
