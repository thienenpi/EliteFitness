import ApiManager from "./ApiManager";

const generateExercise = async ({ data }) => {
  console.log("generateExercise", data);

  try {
    const url = "/exercises/generate";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export { generateExercise };
