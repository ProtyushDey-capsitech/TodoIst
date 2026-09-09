import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
const AnonymusRoute = () => {
  const Userid: string = useSelector((state: RootState) => state.user.id);
  console.log(`id: ${Userid}`);
  if (Userid) return <Navigate to="/" replace />;
  else return <Outlet />;
};

export default AnonymusRoute;
