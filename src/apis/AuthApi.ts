import { store } from "../redux/store";
import { LoginState, LogoutState } from "../redux/TokenCounterSlice";
import { api } from "./app";
import type { LoginPayload, OtpPayload, SignupPayload } from "./types";

export const Login = async (loginData: LoginPayload) => {
  try {
    const { data } = await api.post("Auth/Login", loginData);
    if(!data.status) throw new Error(data.message || "Login failed");
    sessionStorage.setItem("otpSessionId", data.result);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const VerifyOtp = async (values :OtpPayload) => {
  console.log(values);
  try {
    const { data } = await api.post("Auth/VerifyOtp", values);
    store.dispatch(LoginState(data.result.token));

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const Signup = async (signupData: Omit<SignupPayload, "role">) => {
  try {
    const payload: SignupPayload = { ...signupData, role: "ADMIN" };
    const { data } = await api.post("Auth/SaveUser", payload);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const LogoutUser = async () => {
  // const res = await api.post("Auth/Logout");
  // return res.data
  store.dispatch(LogoutState());
};

export const RefreshAccessToken = async () => {
  const res = await api.get("Auth/Refresh");
  return res.data;
};

export const Me = async () => {
  const res = await api.get("Auth/me");
  return res.data.result
};
