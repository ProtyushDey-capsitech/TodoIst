import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";
import { makeStyles } from "@fluentui/react-components";
const useStyles = makeStyles({
    root: {
    display: "flex",
    flexDirection:"column",
    height: "100vh",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: "20px",
  }}
)
const ProtectedRoute = () => {
  const styles = useStyles();

  const token: string = useSelector((state: RootState) => state.token.Token);
  console.log("Token:", token);
  if (token)
    return (
      <div className={styles.root}>
        <Navbar /> 
        <div className={styles.content}>
        <Outlet/>
        </div>
      </div>
    );
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
