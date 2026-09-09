import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
import { App } from "antd";

const ProtectedRoute = () => {
  const userid: string = useSelector((state: RootState) => state.user.id);

  if (userid)
    return (
      <App>
        {" "}
        <Outlet />{" "}
      </App>
    );
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
