import axios from "axios";
import { getCookie } from "../utils/helperFunctions";

export const getApiClient = () => {
  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = getCookie("token");
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return apiClient;
};
