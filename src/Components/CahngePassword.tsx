import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { changepasswordPayload} from "../apis/types";
import { Form, Input, Modal } from "antd";
import { changePassword } from "../apis/AuthApi";

interface props {
  modalopen: boolean;
  modaldisplay: () => void;
  userId: string;
}

const CahngePassword = ({ modalopen, modaldisplay, userId }: props) => {
  const queryClient = useQueryClient();

  const inputError = Yup.object().shape({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: inputError,
    onSubmit: (values: changepasswordPayload) => {
      console.log(values, "values");
       PasswordChange.mutate(values);
    },
  });

  const PasswordChange = useMutation({
    mutationFn: (values: changepasswordPayload) =>
      changePassword(values, userId),
    mutationKey: ["ProjectAdd"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRecentProjects"],
      });
      formik.resetForm();
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
      title={"Change Password"}
      okText={"save"}
      onOk={() => formik.handleSubmit()}
      onCancel={handleClose}
      confirmLoading={PasswordChange.isPending}
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
        <Form.Item<string>
          label="Current Password"
          name="currentPassword"
          validateStatus={
            formik.touched.currentPassword && formik.errors.currentPassword
              ? "error"
              : ""
          }
          help={
            formik.touched.currentPassword && formik.errors.currentPassword
              ? formik.errors.currentPassword
              : ""
          }
        >
          <Input.Password
            name="currentPassword"
            placeholder="Enter current password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item<string>
          label="New password"
          name="newPassword"
          validateStatus={
            formik.touched.newPassword && formik.errors.newPassword
              ? "error"
              : ""
          }
          help={
            formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : ""
          }
        >
          <Input.Password
            name="newPassword"
            placeholder="Enter new password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item<string>
          label="Confirm Password"
          name="confirmPassword"
          validateStatus={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "error"
              : ""
          }
          help={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
        >
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CahngePassword;
