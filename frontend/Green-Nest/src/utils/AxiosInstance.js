import axios from "axios";
import { getAuthToken } from "./TokenManager";
import Constants from "expo-constants";

const backendUrl = Constants.expoConfig.extra.BACKEND_URL;

const CreateAxiosInstance = () => {
  const instance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async function (config) {
      try {
        const token = await getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving token for request:", error);
      }

      console.log("Base URL", config.baseURL);
      const fullUrl = `${config.baseURL || ""}${config.url}`;
      console.log("Request to:", fullUrl);
      console.log("Request config:", config);

      return config;
    },
    function (error) {
      console.error("Request Error:", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const fullUrl = `${response.config.baseURL || ""}${response.config.url}`;
      console.log("Response from:", fullUrl);
      console.log("Response data:", response.data);

      return response;
    },
    function (error) {
      if (error.response) {
        const fullUrl = `${error.response.config.baseURL || ""}${
          error.response.config.url
        }`;
        console.error("Response Error from:", fullUrl);
        console.error("Response Error details:", error.response.data);
      } else {
        console.error("Response Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance;
