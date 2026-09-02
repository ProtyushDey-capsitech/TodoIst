import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Project } from "../apis/types";
import { CreateProject, EditProject } from "../apis/ProjectApi";
import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

interface props {
  modalopen: boolean;
  modaldisplay: () => void;
  isEditing: boolean;
  EditableData: Omit<Project, "status" | "taskCount">;
}

const ProjectForm = ({
  modalopen,
  modaldisplay,
  isEditing,
  EditableData,
}: props) => {
  const queryClient = useQueryClient();

  const inputError = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name is so small")
      .max(100, "Name is so big")
      .required("Name is required"),
    desc: Yup.string()
      .min(20, "Minimum length 20")
      .max(500, "Maximum length 500")
      .required("Description is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEditing
      ? {
          name: EditableData.name,
          desc: EditableData.desc,
        }
      : {
          name: "",
          desc: "",
        },
    validationSchema: inputError,
    onSubmit: (values, { resetForm }) => {
      isEditing ? projectEdit.mutate(values) : projectAdd.mutate(values);
      resetForm();
      modaldisplay();
    },
  });

  const projectAdd = useMutation({
    mutationFn: (values: Omit<Project, "id" | "status" | "taskCount">) =>
      CreateProject(values),
    mutationKey: ["ProjectAdd"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
    },
  });

  const projectEdit = useMutation({
    mutationFn: (values: Omit<Project, "id" | "status" | "taskCount">) =>
      EditProject(values, EditableData.id),

    mutationKey: ["ProjectEdit"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    modaldisplay();
  };

  return (
    <Modal
      open={modalopen}
      title={isEditing?"Edit project":"Add project"}
       okText={"save"}
      onOk={() => formik.handleSubmit()}
      onCancel={handleClose}
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
        <Form.Item
          label="Name"
          validateStatus={
            formik.touched.name && formik.errors.name ? "error" : ""
          }
          help={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
        >
          {" "}
          <Input
            name="name"
            placeholder="Enter project name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
        </Form.Item>
        <Form.Item
          label="Description"
          validateStatus={
            formik.touched.desc && formik.errors.desc ? "error" : ""
          }
          help={
            formik.touched.desc && formik.errors.desc ? formik.errors.desc : ""
          }
        >
          <TextArea
            rows={9}
            name="desc"
            placeholder="Enter project description"
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              resize: "none",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
