import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useState } from "react";
import { VerifyOtp } from "../apis/AuthApi";
import type { OtpPayload } from "../apis/types";
import { Button, Form, Input, Typography, Alert } from "antd";

const OtpPage = () => {
  const navigate = useNavigate();
  const { Title} = Typography;

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
    <div
      className="
        bg-[#F5F5F5]
        shadow-lg
        rounded-[15px]
        min-w-75
        max-w-112.5
        h-80
        mx-auto
        mt-50
        flex
        flex-col
        justify-center
        items-center
        gap-5
        p-1.25
        max-[450px]:w-full
        max-[450px]:h-screen
        max-[450px]:mt-0
        max-[450px]:rounded-none
        max-[450px]:shadow-none
      "
    >
      <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
        Verify otp
      </Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        style={{ minWidth: "90%" }}
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
        styles={{root:{display:"flex", flexDirection:"column", gap:20}}}
      >
        <Form.Item<string>
          label="OTP"
          name="otp"
          validateStatus={
            formik.touched.otp && formik.errors.otp ? "error" : ""
          }
          help={
            formik.touched.otp && formik.errors.otp
              ? formik.errors.otp
              : ""
          }
        >
          <Input.OTP
            length={6}
            size="large"
            value={formik.values.otp}
            onChange={(value) => {
              formik.setFieldValue("otp", value);
            }}
            onBlur={() => {
              formik.setFieldTouched("otp", true);
            }}
          />
        </Form.Item>

        {otpError && (
          <Alert
            type="error"
            message="Invalid OTP"
            showIcon
            className="mb-4"
          />
        )}

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={otpMutation.isPending}
        >
          Verify otp
        </Button>
      </Form>

      {/* <Text>
        You don't have an account, please{" "}
        <span
          className="font-bold text-[#7160e8] cursor-pointer hover:text-[#5c2e91]"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </Text> */}
    </div>
  );
};

export default OtpPage;