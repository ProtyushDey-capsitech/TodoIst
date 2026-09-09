import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const userid: string = useSelector((state: RootState) => state.user.id);

  if (userid)
    return (

        <Outlet />
    );
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
