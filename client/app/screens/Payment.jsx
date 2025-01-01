import { Alert, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles/payment.style";
import { CustomButton, ProductCartItem } from "../components";
import {
  createOrder,
  createOrderDetail,
  updateOrderById,
} from "../api/OrderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getProductById } from "../api/ProductApi";

const orderData = {
  staff_id: null,
  customer_id: null,
  total: null,
  state_id: null,
};

var orderDetailList = [];

const showNotification = (message) => {
  Alert.alert("Notification", message, [{ text: "OK" }]);
};

const Payment = () => {
  const route = useRoute();
  const { items } = route.params;
  const [productList, setProductList] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const TOKEN = await AsyncStorage.getItem("userToken");
      setUserToken(TOKEN);

      // load product details from API
      items.forEach((item) => {
        const productID = item._id;
        const quantity = item.quantity;

        if (productList.length === 0) {
          // Get product details from API using productID
          getProductById({ id: productID, token: TOKEN }).then((res) => {
            // if data is exist, set product details with quantity
            const productData = res.data;

            const orderDetailData = {
              order_id: null,
              product_id: productData._id,
              total: productData.price * quantity,
              quantity: quantity,
            };

            orderDetailList.push(orderDetailData);
            setProductList((prev) => [
              ...prev,
              { ...productData, quantity: quantity },
            ]);
          });
        }
      });

      // load user info from async storage
      const user = await AsyncStorage.getItem("userInfo");
      const userInfo = JSON.parse(user);

      // update order data with user info
      orderData.staff_id = userInfo._id;
      orderData.customer_id = userInfo._id;
      orderData.state_id = "0";
      orderData.total = 0;
    };

    loadData();
  }, []);

  const clearCart = async () => {
    await AsyncStorage.removeItem("cart");
    setProductList([]);
  };

  const handleOrder = () => {
    createOrder({ data: orderData, token: userToken }).then((res) => {
      const order_id = res.data;
      orderDetailList.forEach((orderDetail) => {
        orderDetail.order_id = order_id;
        orderData.total += orderDetail.total;
        console.log(orderDetail);
        createOrderDetail({
          data: orderDetail,
          token: userToken,
        }).then((res) => {
          console.log(res.data);
        });
      });
      updateOrderById({
        id: order_id,
        data: orderData,
        token: userToken,
      }).then((res) => {
        console.log(res.data);
      });
    });

    clearCart()
      .then(() => {
        navigation.navigate("Home");
      })
      .then(() => showNotification("Order successfully!"));
  };

  const renderItem = ({ item }) => (
    <ProductCartItem item={item}></ProductCartItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item._id)}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      ></FlatList>

      <CustomButton
        styles={styles}
        label={"Order"}
        onPress={handleOrder}
        isValid={true}
      ></CustomButton>
    </View>
  );
};

export default Payment;
