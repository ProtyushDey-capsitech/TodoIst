
import { store } from "../redux/store";
import { LoginState, LogoutState } from "../redux/TokenCounterSlice";
import { api } from "./app";
import type { LoginPayload } from "./types";

export const Login = async (LoginData: LoginPayload) => {
  const res = await api.post("Auth/Login", LoginData);
  const token:string = res.data.result.token;
  store.dispatch(LoginState(token));
  return res.data
};

export const me = async () => {
  const res = await api.get("Auth/me");
  return res.data
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