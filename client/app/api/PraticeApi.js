import { ApiManagerFlask } from "./ApiManager";

const predictHeight = async ({ userId, uri }) => {
  try {
    const url = `/height`;
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

export { predictHeight };