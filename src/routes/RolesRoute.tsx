import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
import type { ReactNode } from "react";

interface props{
roles: String[],
children: ReactNode
}

export function RolesAuthRoute({ roles, children }: props) {

    const userid: string = useSelector((state: RootState) => state.user.id);
    const userRole: string = useSelector((state: RootState) => state.user.role);
    console.log(userRole)
    if(!userid) return <Navigate to="/login" replace />;
    if(!roles.includes(userRole)) return <Navigate to="/Unauthorized" replace />;
    
    return <>{children}</>;
}
