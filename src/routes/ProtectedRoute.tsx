import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {

  const token: string = useSelector((state: RootState) => state.token.Token);
  if (token)
    return <Outlet/>
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
