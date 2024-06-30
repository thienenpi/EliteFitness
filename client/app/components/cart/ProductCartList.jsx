import { Alert, FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import styles from "./productCartList.style";
import ProductCartItem from "./ProductCartItem";
import { SIZES } from "../../constants";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";

const ProductCartList = ({ items }) => {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = ({ itemId, quantity }) => {
    const selectedItemIndex = selectedItems.findIndex(
      (item) => item._id === itemId && item.quantity === quantity
    );

    if (selectedItemIndex !== -1) {
      setSelectedItems((prev) =>
        prev.filter((item, index) => index !== selectedItemIndex)
      );
    } else {
      setSelectedItems((prev) => [...prev, { _id: itemId, quantity }]);
    }

    console.log(selectedItems);
  };

  const renderItem = ({ item }) => (
    <ProductCartItem
    showCheckBox={true}
      item={item}
      isSelected={selectedItems.some(
        (selectedItem) =>
          selectedItem._id === item._id &&
          selectedItem.quantity === item.quantity
      )}
      toggleItemSelection={toggleItemSelection}
    ></ProductCartItem>
  );

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <FlatList
          data={items}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          contentContainerStyle={{ rowGap: SIZES.small }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        ></FlatList>
      ) : (
        <Text style={styles.notiText}>No items in cart</Text>
      )}

      <CustomButton
        styles={styles}
        isValid={true}
        onPress={() => {
          if (selectedItems.length > 0) {
            navigation.navigate("Payment", { items: selectedItems });
          } else {
            alert("Please select items to proceed with payment");
          }
        }}
        label={"Payment"}
      ></CustomButton>
    </View>
  );
};

export default ProductCartList;
