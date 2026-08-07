import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"
import { Navigate, Outlet } from "react-router"
const ProtectedRoute = () => {
  const  token:string = useSelector((state:RootState)=>state.token.Token)
  console.log("Token:", token);
  if(token) return <Outlet/>
  else return <Navigate to="/login"/>
}

export default ProtectedRoute