import { Button, Input, Label, makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import type { LoginPayload } from "../apis/types";
import { Login } from "../apis/AuthApi";
import { useNavigate } from "react-router";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#e1dfdd",
    minWidth: "300px",
    maxWidth: "500px",
    height: "500px",
    marginInline: "auto",
    marginTop: "100px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    padding: "20px",
  },
  Title: {
    fontWeight: "600",
    fontSize: "32px",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "20px",
  },
  Input: {
    width: "100%",
    padding: "8px 12px",
  },
  Button: {
    width: "100%",
    padding: "8px 12px",
    color: "#fff",
    backgroundColor: "#0078d4",
    ":hover": {
      backgroundColor: "#005a9e",
    },
  },
});

const LoginPage = () => {
  const styles = useStyle();
  const nevigate = useNavigate()
  const [LoginPaYload, setLoginPayload] = useState<LoginPayload>({
    userName: "",
    password: "",
  });
  const HandleInput = (key: keyof LoginPayload, value: string) => {
    const payload = { ...LoginPaYload, [key]: value };
    setLoginPayload(payload);
  };
  
  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    var response = await Login(LoginPaYload);
    if (response.status == false) {
      alert("Something went wrong");
      return;
    }
    nevigate("/");
    console.log("logged in ");
    setLoginPayload({
      userName: "",
      password: "",
    });
    console.log(response);
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.Title}>Login Page</h1>
      <form className={styles.Form} onSubmit={(e) => login(e)}>
        <Label htmlFor="Email">Email</Label>
        <Input
          id="Email"
          type="email"
          name="userName"
          onChange={(e) => HandleInput("userName", e.target.value)}
          placeholder="Enter the mail"
          required
          value={LoginPaYload.userName}
          className={styles.Input}
        />
        <Label htmlFor="Password">Password</Label>
        <Input
          type="password"
          name="password"
          required
          onChange={(e) => HandleInput("password", e.target.value)}
          placeholder="Enter the task"
          value={LoginPaYload.password}
          className={styles.Input}
        />

        <Button className={styles.Button} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
