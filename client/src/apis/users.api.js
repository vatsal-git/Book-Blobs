import { getApiClient } from ".";

export const getCurrentUser = async () => {
  try {
    const response = await getApiClient().get("/users/current_user/");
    console.log({ response });
    return { data: response.data, success: true };
  } catch (error) {
    console.error(error);
    return {
      message: error.response?.data.detail || "Something went wrong!",
      success: false,
    };
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await getApiClient().get("/users", {
      params: {
        user_id: userId,
      },
    });
    return { data: response.data, success: true };
  } catch (error) {
    console.error(error);
    return {
      message: error.response?.data.detail || "Something went wrong!",
      success: false,
    };
  }
};
