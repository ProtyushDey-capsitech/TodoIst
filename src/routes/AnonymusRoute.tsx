import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";

const AnonymusRoute = () => {

    const userId = useSelector(
        (state: RootState) => state.user.id
    );

    console.log("User ID:", userId);

    // User is already logged in
    if (userId) {
        return <Navigate to="/" replace />;
    }

    // User is not logged in
    return <Outlet />;
};

export default AnonymusRoute;
