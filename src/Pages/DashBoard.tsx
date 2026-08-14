import { makeStyles } from "@fluentui/react-components";
import { Navbar } from "../Components/Navbar";
import { Outlet } from "react-router";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
});
const DashBoard = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
