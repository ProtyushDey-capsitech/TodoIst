import {
  Button,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  tokens,
} from "@fluentui/react-components";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useState } from "react";
import { VerifyOtp } from "../apis/AuthApi";
import type { OtpPayload } from "../apis/types";

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

  Description: {
    width: "90%",
    textAlign: "center",
    marginTop: "-20px",
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

  Resend: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7160e8",
    cursor: "pointer",

    ":hover": {
      color: "#5c2e91",
    },
  },
});



const OtpPage = () => {
  const styles = useStyle();
  const navigate = useNavigate();

  const [otpError, setOtpError] = useState(false);

  const sessionId = sessionStorage.getItem("otpSessionId") ?? "";

  const inputError = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be 6 digits"),
  });

  const otpMutation = useMutation({
    mutationFn: (values: OtpPayload) => VerifyOtp(values),

    onSuccess: () => {
      setOtpError(false);
      navigate("/");
      formik.resetForm();
    },

    onError: () => {
      setOtpError(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },

    validationSchema: inputError,

    onSubmit: (values) => {
      setOtpError(false);

      otpMutation.mutate({
        sessionId,
        otp: values.otp,
      });
    },
  });

  return (
    <div className={styles.card}>
      <h1 className={styles.Title}>Verify OTP</h1>

      <p className={styles.Description}>
        Enter the 6-digit OTP sent to your email address.
      </p>

      <form className={styles.Form} onSubmit={formik.handleSubmit}>
        <div className={styles.InputBox}>
          <Label htmlFor="otp">OTP</Label>

          <Input
            id="otp"
            type="text"
            name="otp"
            maxLength={6}
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              formik.setFieldValue("otp", value);
              setOtpError(false);
            }}
            onBlur={formik.handleBlur}
            placeholder="Enter 6 digit OTP"
            value={formik.values.otp}
            className={styles.Input}
          />

          {formik.touched.otp && formik.errors.otp && (
            <MessageBar intent="error">
              <MessageBarBody>{formik.errors.otp}</MessageBarBody>
            </MessageBar>
          )}
        </div>

        {otpError && (
          <MessageBar intent="error">
            <MessageBarBody>
              Invalid or expired OTP
            </MessageBarBody>
          </MessageBar>
        )}

        <Button
          className={styles.Button}
          type="submit"
          disabled={otpMutation.isPending}
        >
          {otpMutation.isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>

      <p>
        Didn't receive the OTP?{" "}
        <span
          className={styles.Resend}
          onClick={() => {
            // Add resend OTP API here
            console.log("Resend OTP");
          }}
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default OtpPage;