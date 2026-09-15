import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../redux/store";
import AdminDashBoard from "../Pages/AdminDashboard";
import DashBoard from "../Pages/DashBoard";

const RoleDashboard = () => {

    const role = useSelector(
        (state: RootState) => state.user.role
    );

    if (role === "ADMIN") {
        return <AdminDashBoard />;
    }

    if (role === "EMPLOYEE") {
        return <DashBoard />;
    }

    return <Navigate to="/Unauthorized" replace />;
};
export default RoleDashboard