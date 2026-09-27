import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://api.uzpolis.uz";

const api = axios.create({
  baseURL: API_BASE_URL,
});

type QueuedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

type RefreshResponse = {
  success: boolean;
  data: { accessToken: string; refreshToken: string };
};

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error || !token) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// REQUEST
api.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem("language");
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    if (lang) {
      // Backend content is currently served in Uzbek only.
      config.headers["Accept-Language"] = "uz";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE — transparently refresh an expired access token and replay the request
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      // A refresh is already in flight — queue this request until it finishes
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

        const res = await axios.post<RefreshResponse>(`${API_BASE_URL}/api/v1/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refresh", newRefreshToken);

        processQueue(null, accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Refresh failed — log the user out
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
