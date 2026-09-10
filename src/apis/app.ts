import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { LogoutUser, RefreshAccessToken } from "./AuthApi";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL??"https://todo-backend-dotnet.onrender.com/api",
  withCredentials: true,
});



api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.status == 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

        const res = await RefreshAccessToken();
        if (res) {
          return api(originalRequest);
        } else {
          await LogoutUser();
        }
      
    }
  },
);
