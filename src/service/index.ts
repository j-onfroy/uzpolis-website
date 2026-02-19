// import axios, { AxiosRequestHeaders } from "axios";
// const api = axios.create({
//   baseURL: "https://api.uzpolis.uz",
// });

// // request interceptor

// api.interceptors.request.use(
//   (config) => {
//     const lang = window.localStorage.getItem("language");
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.set('Authorization', `Bearer ${token}`);
//     }
//     config.headers['Accept-Language'] = lang
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error); // You should return a rejected promise here
//   }
// );
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // const message =
//     //   error?.error || t("error_msg");

//     // show toast
//     // toast.error(message);

//     // optional: handle auth error
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/user/login";
//     }

//     return Promise.reject(error);
//   }
// );
// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.uzpolis.uz",
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ✅ REQUEST
api.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem("language");
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    if (lang) {
      config.headers["Accept-Language"] = lang;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 RESPONSE (REFRESH LOGIC HERE)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ if unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // if already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh");

        // 🔥 CALL REFRESH API
        const res = await axios.post(
          "https://api.uzpolis.uz/api/v1/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        // save new token
        localStorage.setItem("token", newAccessToken);

        processQueue(null, newAccessToken);

        // retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // ❌ logout if refresh fails
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        window.location.href = "/user/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
