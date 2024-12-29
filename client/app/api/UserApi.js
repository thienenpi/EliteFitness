import { ApiManagerNodeJS, ApiManagerFlask } from "./ApiManager";

const userLogin = async ({ data }) => {
  try {
    const url = "/users/login/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

const userRegister = async ({ data }) => {
  try {
    data.role_id = "a";
    data.status = "a";
    data.name = "New user";
    data.phone = "0777819503";
    const url = "/users/register/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

const updatePassword = async ({ data }) => {
  try {
    const url = "/users/updatePassword/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

const calculateBMI = async ({ userId, uri }) => {
  try {
    const url = `/bmi?id=2`;
    let formData = new FormData();

    const fileType = uri.split(".").pop();
    const mimeType = `image/${fileType}`;

    formData.append("image", {
      uri: uri,
      name: `${userId}.${fileType}`,
      type: mimeType,
    });

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    const res = await ApiManagerFlask(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export { userLogin, userRegister, updatePassword, calculateBMI };
