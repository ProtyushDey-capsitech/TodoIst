import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
const AnonymusRoute = () => {
  const token: string = useSelector((state: RootState) => state.token.Token);
  console.log("Token:", token);
  if (token) return <Navigate to="/" replace />;
  else return <Outlet />;
};

export default AnonymusRoute;
