import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Textarea,
} from "@fluentui/react-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Pagination, Project } from "../apis/types";
import { CreateProject, EditProject } from "../apis/ProjectApi";

interface props {
  modalopen: boolean;
  modaldisplay: () => void;
  isEditing: boolean;
  EditableData: Omit<Project, "status" | "taskCount">;
  pages: number;
}

const useStyle = makeStyles({
  Form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "20px",
    marginBlock: "20px",
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
  Textarea: {
    width: "100%",
    padding: "8px 12px",
    height: "200px",
  },
});

const ProjectForm = ({
  modalopen,
  modaldisplay,
  isEditing,
  EditableData,
  pages,

}: props) => {
  const styles = useStyle();
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
    onSuccess: (_data, project) => {
      queryClient.setQueryData<Pagination<Project>>(
        ["getProject", pages],
        (oldData) => {
          if (!oldData) return oldData;

          const newProject: Project = {
            id: _data.result,
            status: false,
            taskCount: 0,
            ...project,
          };

          return {
            ...oldData,
            results: [newProject, ...oldData.results].slice(0, 10),
            total: oldData.total + 1,
          };
        },
      );
    },
  });

  const projectEdit = useMutation({
    mutationFn: (values: Omit<Project, "id" | "status" | "taskCount">) =>
      EditProject(values, EditableData.id),

    mutationKey: ["ProjectEdit"],

    onSuccess: (_data, projectdata) => {
      queryClient.setQueryData<Pagination<Project>>(
        ["getProject", pages],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            results: oldData.results.map((project) => {
              if (project.id === EditableData.id) {
                return {
                  ...project,
                  desc: projectdata.desc,
                  name: projectdata.name,
                };
              }

              return project;
            }),
          };
        },
      );
    },
  });

  return (
    <Dialog
      open={modalopen}
      onOpenChange={() => {
        formik.resetForm();
        modaldisplay();
      }}
    >
      <DialogSurface>
        <form onSubmit={formik.handleSubmit}>
          <DialogBody>
            <DialogTitle>Add Project</DialogTitle>

            <DialogContent className={styles.Form}>
              <div className={styles.InputBox}>
                <Label htmlFor="name">Project Name</Label>

                <Input
                  id="name"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Project name"
                  value={formik.values.name}
                  className={styles.Input}
                />

                {formik.touched.name && formik.errors.name && (
                  <MessageBar intent="error">
                    <MessageBarBody>{formik.errors.name}</MessageBarBody>
                  </MessageBar>
                )}
              </div>

              <div className={styles.InputBox}>
                <Label htmlFor="desc">Description</Label>

                <Textarea
                  id="desc"
                  name="desc"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Description"
                  value={formik.values.desc}
                  className={styles.Textarea}
                />

                {formik.touched.desc && formik.errors.desc && (
                  <MessageBar intent="error">
                    <MessageBarBody>{formik.errors.desc}</MessageBarBody>
                  </MessageBar>
                )}
              </div>
            </DialogContent>

            <DialogActions>
              <Button appearance="primary" type="submit">
                {isEditing ? "Edit project" : "Create Project"}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default ProjectForm;
