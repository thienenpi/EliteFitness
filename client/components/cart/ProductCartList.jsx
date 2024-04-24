import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import styles from "./productCartList.style";
import ProductCartItem from "./ProductCartItem";
import { SIZES } from "../../constants";

const ProductCartList = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
    console.log(selectedItems);
  };

  const renderItem = ({ item }) => (
    <ProductCartItem
      item={item}
      isSelected={selectedItems.includes(item._id)}
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
    </View>
  );
};

export default ProductCartList;
