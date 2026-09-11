import { store } from "../redux/store";
import { LoginState, LogoutState } from "../redux/UserSlice";
import { api } from "./app";
import type { changepasswordPayload, LoginPayload, OtpPayload, SignupPayload} from "./types";

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
    store.dispatch(LoginState(data.result));

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const changePassword = async (values: changepasswordPayload , userId: string) => {
  try {
    const { data } = await api.post(`Auth/ChangePassword/${userId}`, values);
    return data;
  } catch (error) {
    console.error("Change password failed:", error);
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
  const res = await api.post("Auth/Logout");
  store.dispatch(LogoutState());
  return res.data
};

export const ResendOTP = async (userId: string) =>{
   await api.post("Auth/Resend", {}, { params: { userId } });
}

let refreshPromise: Promise<boolean> | null = null;

export const RefreshAccessToken = async (): Promise<boolean> => {
  if (refreshPromise) {
    return refreshPromise;
  }
  
  refreshPromise = (async () => {
    try {
      const res = await api.get("Auth/Refresh");

      if (res.data.status) {
        store.dispatch(LoginState(res.data.result));
      }
      return res.data.status;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};