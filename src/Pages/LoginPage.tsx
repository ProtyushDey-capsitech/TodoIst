import {
  Button,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  tokens,
} from "@fluentui/react-components";
import { Login } from "../apis/AuthApi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../apis/types";
import * as Yup from "yup";
import { useState } from "react";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#fefbf4",
    boxShadow: tokens.shadow4,
    minWidth: "300px",
    maxWidth: "450px",
    height: "500px",
    marginInline: "auto",
    marginTop: "200px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "40px",
    alignItems: "center",
    padding: "5px",
    "@media (max-width: 450px)": {
      margin: "0px",
      width: "100%",
      height: "100vh",
      boxShadow: "none",
    },
  },
  Title: {
    fontWeight: "600",
    fontSize: "32px",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    gap: "20px",
  },
  InputBox: {
    width: "100%",
    display: "flex",
    gap: "5px",
    flexDirection: "column",
  },
  Input: {
    width: "100%",
    padding: "8px 12px",
  },
  Button: {
    width: "100%",
    padding: "8px 12px",
    color: "#fff",
    backgroundColor: "#7160e8",
    ":hover": {
      backgroundColor: "#5c2e91",
      color: "#fff",
    },
  },
  Signin: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7160e8",
    cursor: "pointer",
    ":hover": {
      color: "#5c2e91",
    },
  },
});

const LoginPage = () => {
  const styles = useStyle();
  const navigate = useNavigate();
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const inputError = Yup.object().shape({
    userName: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: inputError,
    onSubmit: (values) => {
      loginmutation.mutate(values);
    },
  });

  const loginmutation = useMutation({
    mutationFn: (values: LoginPayload) => Login(values),
    onSuccess: (_data) => {
      navigate("/");
      formik.resetForm();
    },
    onError: (_data) => {
      setAccountExists(true);
      return;
    },
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.Title}>Login</h1>
      <form className={styles.Form} onSubmit={formik.handleSubmit}>
        <div className={styles.InputBox}>
          <Label htmlFor="userName">Email</Label>
          <Input
            type="email"
            name="userName"
            onChange={formik.handleChange}
            placeholder="Enter the email"
            value={formik.values.userName}
            className={styles.Input}
          />
          {formik.touched.userName && formik.errors.userName && (
            <MessageBar intent="error">
              <MessageBarBody>{formik.errors.userName}</MessageBarBody>
            </MessageBar>
          )}
        </div>
        <div className={styles.InputBox}>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            placeholder="Enter the password"
            value={formik.values.password}
            className={styles.Input}
          />
          {formik.touched.password && formik.errors.password && (
            <MessageBar intent="error">
              <MessageBarBody>{formik.errors.password}</MessageBarBody>
            </MessageBar>
          )}
        </div>
        <Button className={styles.Button} type="submit">
          Login
        </Button>
      </form>
      {accountExists && (
        <MessageBar intent="error">
          <MessageBarBody>{"Invalid user name or password"}</MessageBarBody>
        </MessageBar>
      )}
      <p>
        You don't have an account, please{" "}
        <span className={styles.Signin} onClick={() => navigate("/signup")}>
          Singup
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
