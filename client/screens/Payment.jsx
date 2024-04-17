import { Text, View } from "react-native";
import React from "react";
import styles from "./styles/payment.style";
import { CustomButton } from "../components";
import { createOrder } from "../api/OrderApi";

const data = {
  staff_id: "a",
  customer_id: "a",
  total: 1000,
  state_id: "a",
};

const Payment = () => {
  return (
    <View style={styles.container}>
      <CustomButton
        styles={styles}
        label={"Order"}
        onPress={async () => {
          await createOrder({ data: data });
        }}
        isValid={true}
      ></CustomButton>
    </View>
  );
};

export default Payment;
