
import { store } from "../redux/store";
import { LoginState, LogoutState } from "../redux/TokenCounterSlice";
import { api } from "./app";
import type { LoginPayload, SignupPayload } from "./types";

export const Login = async (loginData: LoginPayload) => {
  try {
    const { data } = await api.post("Auth/Login", loginData);
    store.dispatch(LoginState(data.result.token));
    return data;
  } 
  catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const Signup = async (signupData: Omit<SignupPayload,"role">) => {
  try {
    const payload: SignupPayload = {...signupData, role:"ADMIN"}
    const { data } = await api.post("Auth/SaveUser", payload);
    return data;
  } 
  catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const LogoutUser = async () => {
// const res = await api.post("Auth/Logout");
// return res.data
store.dispatch(LogoutState());
};

export const RefreshAccessToken = async ()=> {
const res = await api.get("Auth/Refresh");
return res.data
};