import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
// import { LogoutUser } from "./AuthApi";
import { store } from "../redux/store";
import { LogoutState } from "../redux/TokenCounterSlice";
export const api = axios.create({
    baseURL:"https://localhost:5001/api",
    withCredentials: true,
    timeout:1000,
})

api.interceptors.request.use((con:InternalAxiosRequestConfig) : InternalAxiosRequestConfig=>{
    const token:string = localStorage.getItem("TO_Access")||"";
    con.headers.Authorization = `Bearer ${token}`;
    return con;
}
)

api.interceptors.response.use(
    (res) =>res,
    async (error:AxiosError)=>{
        if(error.status == 401) store.dispatch(LogoutState());
    }
    
 )