import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { LogoutUser, RefreshAccessToken } from "./AuthApi";
import { store } from "../redux/store";
import { LoginState } from "../redux/TokenCounterSlice";
export const api = axios.create({
  baseURL: "https://localhost:5001/api",
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  (con: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string = localStorage.getItem("TO_Access") || "";
    con.headers.Authorization = `Bearer ${token}`;
    return con;
  },
);

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.status == 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await RefreshAccessToken();
        if (res.status) {
          const token: string = res.result.token;
          store.dispatch(LoginState(token));
          return api(originalRequest);
        } else {
          await LogoutUser();
        }
      } catch (err) {
        await LogoutUser();
      }
    }
  },
);
