import * as React from "react";
import type { JSXElement } from "@fluentui/react-components";
import {
  AppItem,
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  Board20Regular,
  CheckmarkCircle20Regular,
  Dismiss20Regular,
  PersonCircle32Regular,
  SignOut20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  nav: {
    minWidth: "240px",
  },

  content: {
    flex: 1,
    padding: "20px",
  },

  logout: {
    marginTop: "auto",
    width: "100%",
  },
  button: {
    height: "50px",
  },
  navbar: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#fffef5",
    boxShadow:tokens.shadow2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "36px",
    fontFamily:"cursive"

  },
});

export const Navbar = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <NavDrawer
        open={isOpen}
        type={"overlay"}
        className={styles.nav}
        defaultSelectedValue="projects"
      >
        <NavDrawerBody>
          <NavDrawerHeader>
            <Button
              appearance="subtle"
              icon={<Dismiss20Regular />}
              onClick={() => setIsOpen(false)}
            />
          </NavDrawerHeader>
          <AppItem icon={<PersonCircle32Regular />}>Task Manager</AppItem>

          <NavItem icon={<Board20Regular />} value="projects">
            Projects
          </NavItem>

          <NavItem icon={<CheckmarkCircle20Regular />} value="tasks">
            Tasks
          </NavItem>

          <Button
            appearance="subtle"
            icon={<SignOut20Regular />}
            className={styles.logout}
          >
            Logout
          </Button>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.navbar}>
        <p className={styles.heading}>Task Manager</p>
        <Hamburger onClick={() => setIsOpen(true)} className={styles.button} />
      </div>
    </>
  );
};
