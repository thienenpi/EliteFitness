import ApiManagerNodeJS from "./ApiManager";

const getProductById = async ({ id, token }) => {
  try {
    const url = `/products/${id}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export { getProductById };
