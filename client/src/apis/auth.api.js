import { getApiClient } from ".";

export const registerUser = async (userData) => {
  try {
    const response = await getApiClient().post("/auth/register/", userData);
    return { data: response.data, success: true };
  } catch (error) {
    console.error(error);
    return {
      message: error.response?.data.detail || "Something went wrong!",
      success: false,
    };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await getApiClient().post("/auth/login/", userData);
    return { data: response.data, success: true };
  } catch (error) {
    console.error(error);
    return {
      message: error.response?.data.detail || "Something went wrong!",
      success: false,
    };
  }
};
