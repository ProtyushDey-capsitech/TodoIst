import {
  Button,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  tokens,
} from "@fluentui/react-components";
import { Signup } from "../apis/AuthApi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { SignupPayload } from "../apis/types";
import * as Yup from "yup";
import { useState } from "react";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#fefbf4",
    boxShadow: tokens.shadow4,
    minWidth: "300px",
    maxWidth: "450px",
    height: "600px",
    marginInline: "auto",
    marginTop: "150px",
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
  NameBox: {
    width: "100%",
    display: "flex",
    gap: "5px",
    justifyContent: "center",
    "@media (max-width: 450px)": {
      flexDirection: "column",
    },
  },
  NameInputBox: {
    width: "50%",
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    "@media (max-width: 450px)": {
      width: "100%",
    },
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

const SignupPage = () => {
  const styles = useStyle();
  const navigate = useNavigate();
  const [accountExists, setAccountExists] = useState<boolean>(false);
  const inputError = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    name: Yup.object({
      first: Yup.string().required("First name is required"),

      last: Yup.string().required("Last name is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      name: {
        first: "",
        last: "",
      },
    },
    validationSchema: inputError,
    onSubmit: (values, { resetForm }) => {
      signupmutation.mutate(values);
      resetForm();
    },
  });

  const signupmutation = useMutation({
    mutationFn: (values: Omit<SignupPayload,"role">) => Signup(values),
    onSuccess: (_data) => {
      if (!_data.status) {
        setAccountExists(true);
        return;
      }
      navigate("/login");
    },
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.Title}>SignUp</h1>
      <form className={styles.Form} onSubmit={formik.handleSubmit}>
        <div className={styles.NameBox}>
          <div className={styles.NameInputBox}>
            <Label htmlFor="first">First name</Label>
            <Input
              id="first"
              type="text"
              name="name.first"
              onChange={formik.handleChange}
              placeholder="First name"
              value={formik.values.name.first}
              className={styles.Input}
            ></Input>
            {formik.touched.name?.first && formik.errors.name?.first && (
              <MessageBar intent="error">
                <MessageBarBody>{formik.errors.name.first}</MessageBarBody>
              </MessageBar>
            )}
          </div>
          <div className={styles.NameInputBox}>
            <Label htmlFor="last">Last name</Label>
            <Input
              id="last"
              type="text"
              name="name.last"
              onChange={formik.handleChange}
              placeholder="Last name"
              value={formik.values.name.last}
              className={styles.Input}
            ></Input>
            {formik.touched.name?.last && formik.errors.name?.last && (
              <MessageBar intent="error">
                <MessageBarBody>{formik.errors.name.last}</MessageBarBody>
              </MessageBar>
            )}
          </div>
        </div>
        <div className={styles.InputBox}>
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            type="text"
            name="phoneNumber"
            onChange={formik.handleChange}
            placeholder="Enter the phone number"
            value={formik.values.phoneNumber}
            className={styles.Input}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <MessageBar intent="error">
              <MessageBarBody>{formik.errors.phoneNumber}</MessageBarBody>
            </MessageBar>
          )}
        </div>
        <div className={styles.InputBox}>
          <Label htmlFor="Email">Email</Label>
          <Input
            id="Email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            placeholder="Enter the email"
            value={formik.values.email}
            className={styles.Input}
          />
          {formik.touched.email && formik.errors.email && (
            <MessageBar intent="error">
              <MessageBarBody>{formik.errors.email}</MessageBarBody>
            </MessageBar>
          )}
        </div>
        <Button className={styles.Button} type="submit">
          SignUp
        </Button>
      </form>
      {accountExists && (
        <MessageBar intent="error">
          <MessageBarBody>{signupmutation.data?.message}</MessageBarBody>
        </MessageBar>
      )}
      <p>
        You have an account, please{" "}
        <span className={styles.Signin} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
