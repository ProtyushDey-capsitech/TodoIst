import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { SignupPayload } from "../apis/types";
import { Form, Input, Modal } from "antd";
import { AddEmployee } from "../apis/AuthApi";
// import { useState } from "react";

interface props {
  modalopen: boolean;
  modaldisplay: () => void;

}

const EmplyeeForm = ({ modalopen, modaldisplay }: props) => {
//   const [accountExists, setAccountExists] = useState<boolean>(false);

  const inputError = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    phoneNumber: Yup.string()
      .required("Phone number is required"),

    name: Yup.object({
      first: Yup.string()
        .required("First name is required"),

      last: Yup.string()
        .required("Last name is required"),
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
      role: "EMPLOYEE",
    },

    validationSchema: inputError,

    onSubmit: (values, { resetForm }) => {
      EmployeeMutation.mutate(values);
      resetForm();
    },
  });

  const EmployeeMutation = useMutation({
    mutationFn: (values: SignupPayload) => AddEmployee(values),

    onSuccess: (_data) => {
      if (!_data.status) {
        // setAccountExists(true);
        return;
      }
      modaldisplay();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    modaldisplay();
  };

  return (
    <Modal
      open={modalopen}
      title={"Add employeee"}
      okText={"save"}
      onOk={() => formik.handleSubmit()}
      onCancel={handleClose}
      confirmLoading={EmployeeMutation.isPending}
      styles={{
        title: {
          fontSize: 24,
        },
      }}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        {/* First Name */}
        <Form.Item
          label="First Name"
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

        {/* Last Name */}
        <Form.Item
          label="Last Name"
          validateStatus={
            formik.touched.name?.last && formik.errors.name?.last
              ? "error"
              : ""
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

        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={
            formik.touched.email && formik.errors.email
              ? "error"
              : ""
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

        {/* Phone Number */}
        <Form.Item
          label="Phone Number"
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
            placeholder="Enter phone number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmplyeeForm;
