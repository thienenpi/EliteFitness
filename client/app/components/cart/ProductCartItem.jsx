import React, { useState } from "react";
import { Text, Image, TouchableOpacity, View, Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "./productCartItem.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateCartAsyncStorage = async ({ _id, quantity }) => {
  const cartData = await AsyncStorage.getItem("cart");

  // find item._id in cart
  const parsedCartData = JSON.parse(cartData);
  const itemIndex = parsedCartData.findIndex((item) => item._id === _id);

  // update quantity
  parsedCartData[itemIndex].quantity = quantity;

  if (quantity === 0) {
    // remove item from cart if quantity is 0
    parsedCartData.splice(itemIndex, 1);
  }

  // save to AsyncStorage
  await AsyncStorage.setItem("cart", JSON.stringify(parsedCartData));

  return parsedCartData;
};

const ProductCartItem = ({
  item,
  showCheckBox = false,
  isSelected,
  toggleItemSelection,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(isSelected);
  const [quantity, setQuantity] = useState(item.quantity); // Initial quantity is 1

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartAsyncStorage({ _id: item._id, quantity: quantity - 1 }).then(
        (data) => {
          console.log(data);
        }
      );
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
    updateCartAsyncStorage({ _id: item._id, quantity: quantity + 1 }).then(
      (data) => {
        console.log(data);
      }
    );
    setQuantity(quantity + 1);
  };

  const deleteItem = () => {
    // Implement deletion logic here
    updateCartAsyncStorage({ _id: item._id, quantity: 0 }).then((data) => {
      //   console.log(data);
    });

    // clear this item from the cart
    setQuantity(0);

    // For now, let's just log a message
    console.log("Item deleted");
  };

  if (quantity === 0) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.cartItemContainer}>
      {showCheckBox && (
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => setToggleCheckBox(!toggleCheckBox)}
        >
          <CheckBox
            style={{ height: 20, width: 20 }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
              toggleItemSelection({ itemId: item._id, quantity: quantity });
              setToggleCheckBox(newValue);
            }}
          />
        </TouchableOpacity>
      )}
      <Image style={styles.productImage} source={{ uri: item.imageUrl }} />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>
            {item.price.toLocaleString("vi-VN")} VND
          </Text>

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
