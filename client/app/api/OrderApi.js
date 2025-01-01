import { ApiManagerNodeJS } from "./ApiManager";

const createOrder = async ({ data, token }) => {
  try {
    const url = "/orders/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const res = await ApiManagerNodeJS(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const updateOrderById = async ({ id, data, token }) => {
  try {
    const url = `/orders/${id}`;
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const res = await ApiManagerNodeJS(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const createOrderDetail = async ({ data, token }) => {
  try {
    const url = "/orderDetails/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const res = await ApiManagerNodeJS(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

// Export the functions

export { createOrder, createOrderDetail, updateOrderById };
