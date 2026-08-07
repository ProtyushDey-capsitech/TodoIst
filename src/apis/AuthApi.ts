
import { api } from "./app";
import type { LoginPayload } from "./types";

export const Login = async (LoginData: LoginPayload) => {
  const res = await api.post("Auth/Login", LoginData);
  return res.data
};

export const me = async () => {
  const res = await api.get("Auth/me");
  return res.data
};

// export const LogoutUser = async () => {
// const res = await api.post("Auth/Logout");
// return res.data
// };