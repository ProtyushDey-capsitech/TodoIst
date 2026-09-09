import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { LogoutUser, RefreshAccessToken } from "./AuthApi";
import { store } from "../redux/store";
import { LoginState } from "../redux/UserSlice";
import type { UserData } from "./types";
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
        if (res.status) {
          const userData: UserData = res.result;
          store.dispatch(LoginState(userData));
          return api(originalRequest);
        } else {
          await LogoutUser();
        }
      
    }
  },
);
