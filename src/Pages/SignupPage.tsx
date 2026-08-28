import { Signup } from "../apis/AuthApi";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import type { SignupPayload } from "../apis/types";
import * as Yup from "yup";
import { useState } from "react";
import { Alert, Button, Form, Input, Typography } from "antd";

const { Title, Text } = Typography;
const SignupPage = () => {
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
    mutationFn: (values: Omit<SignupPayload, "role">) => Signup(values),
    onSuccess: (_data) => {
      if (!_data.status) {
        setAccountExists(true);
        return;
      }
      navigate("/login");
      formik.resetForm();
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
        h-135
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
        Sign Up
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
          label="FirstName"
          name="name.first"
          validateStatus={
            formik.touched.name?.first && formik.errors.name?.first
              ? "error"
              : ""
          }
          help={
            formik.touched.name?.first && formik.errors.name?.first
              ? formik.errors.name.first
              : ""
          }
        >
          <Input
            name="name.first"
            placeholder="Enter first name"
            value={formik.values.name.first}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item<string>
          label="LastName"
          name="name.last"
          validateStatus={
            formik.touched.name?.last && formik.errors.name?.last ? "error" : ""
          }
          help={
            formik.touched.name?.last && formik.errors.name?.last
              ? formik.errors.name.last
              : ""
          }
        >
          <Input
            name="name.last"
            placeholder="Enter last name"
            value={formik.values.name.last}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item<string>
          label="Email"
          name="userName"
          validateStatus={
            formik.touched.email && formik.errors.email ? "error" : ""
          }
          help={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        >
          <Input
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item<string>
          label="Phone number"
          name="phoneNumber"
          validateStatus={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? "error"
              : ""
          }
          help={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""
          }
        >
          <Input
            name="phoneNumber"
            placeholder="Enter PhoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={signupmutation.isPending}
        >
          Sign Up
        </Button>
      </Form>

      {accountExists && (
        <Alert type="error" message={signupmutation.data?.message} showIcon />
      )}

      <Text>
        You have an account, please{" "}
        <span
          className="font-bold text-[#0077ff] cursor-pointer hover:text-[#0166da]"
          onClick={() => navigate(-1)}
        >
          Login
        </span>
      </Text>
    </div>
  );
};

export default SignupPage;
