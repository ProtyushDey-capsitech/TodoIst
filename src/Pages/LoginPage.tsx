import { Button, Input, Typography, Alert, Form } from "antd";
import { Login } from "../apis/AuthApi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../apis/types";
import * as Yup from "yup";
import { useState } from "react";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const inputError = Yup.object().shape({
    userName: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginmutation = useMutation({
    mutationFn: (values: LoginPayload) => Login(values),
    onSuccess: () => {
      navigate("/otp");
      formik.resetForm();
    },
    onError: () => {
      setAccountExists(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: inputError,
    onSubmit: (values) => {
      setAccountExists(false);
      loginmutation.mutate(values);
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
        h-125
        mx-auto
        mt-50
        flex
        flex-col
        justify-center
        items-center
        gap-10
        p-1.25
        max-[450px]:w-full
        max-[450px]:h-screen
        max-[450px]:mt-0
        max-[450px]:rounded-none
        max-[450px]:shadow-none
      "
    >
      <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
        Login
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
      >
        <Form.Item<string>
          label="Email"
          name="userName"
          validateStatus={
            formik.touched.userName && formik.errors.userName ? "error" : ""
          }
          help={
            formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : ""
          }
        >
          <Input
            name="userName"
            placeholder="Enter email"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item<string>
          label="Password"
          name="password"
          validateStatus={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
          help={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        >
          <Input.Password
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loginmutation.isPending}
        >
          Login
        </Button>
      </Form>

      {accountExists && (
        <Alert type="error" message="Invalid user name or password" showIcon />
      )}

      <Text>
        You don't have an account, please{" "}
        <span
          className="font-bold text-[#0077ff] cursor-pointer hover:text-[#0166da]"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </Text>
    </div>
  );
};

export default LoginPage;
