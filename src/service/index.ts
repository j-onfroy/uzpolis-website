import axios, { AxiosRequestHeaders } from "axios";
import { t } from "i18next";
import toast from "react-hot-toast";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  baseURL: "https://api.uzpolis.uz",
});

// request interceptor

api.interceptors.request.use(
  (config) => {
    // config.headers = config.headers || {};
    const rawToken = window.localStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // }
    // if (config.headers) {
    //   config.headers = new axios.AxiosHeaders();
    // }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error); // You should return a rejected promise here
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || t("error_msg");

    // show toast
    toast.error(message);

    // optional: handle auth error
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default api;
