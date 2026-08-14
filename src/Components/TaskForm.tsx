import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Dropdown,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Option,
  Textarea,
} from "@fluentui/react-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { ProjectData, Task } from "../apis/types";
import { createTask, UpdateTask } from "../apis/TaskApi";
// import { CreateProject, EditProject } from "../apis/ProjectApi";

interface props {
  modalopen: boolean;
  modaldisplay: () => void;
  isEditing: boolean;
  id: string;
  EditableData: Omit<Task, "status" | "createdAt">;
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
    height: "80px",
  },
});

const TaskForm = ({
  modalopen,
  modaldisplay,
  isEditing,
  id,
  EditableData,
  pages,
}: props) => {
  const styles = useStyle();
  const queryClient = useQueryClient();

  const inputError = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name is so small")
      .max(20, "Name is so big")
      .required("Name is required"),
    desc: Yup.string()
      .min(10, "Minimum length 10")
      .max(80, "Maximum length 80")
      .required("Description is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEditing
      ? {
          name: EditableData.name,
          desc: EditableData.desc,
          priority: EditableData.priority,
        }
      : {
          name: "",
          desc: "",
          priority: "Low",
        },
    validationSchema: inputError,
    onSubmit: (values, { resetForm }) => {
      isEditing ? TaskEdit.mutate(values) : TaskAdd.mutate(values);
      console.log(values);
      resetForm();
      modaldisplay();
    },
  });

  const TaskAdd = useMutation({
    mutationFn: (values: Omit<Task, "id" | "status" | "createdAt">) =>
      createTask(values, id),
    mutationKey: ["ProjectAdd"],
    onSuccess: (_data, task) => {
      queryClient.setQueryData<ProjectData>(
        ["getProject", id, pages],
        (oldData) => {
          if (!oldData) return oldData;

          const newTask: Task = {
            id: _data.result,
            name: task.name,
            desc: task.desc,
            priority: task.priority,
            status: "Todo",
            createdAt: new Date().toISOString(),
          };

          return {
            ...oldData,
            tasks: [newTask, ...oldData.tasks].slice(0, 5),
            taskCount: oldData.taskCount + 1,
          };
        },
      );
    },
  });

  const TaskEdit = useMutation({
    mutationFn: (values: Omit<Task, "id" | "status" | "createdAt">) =>
      UpdateTask(EditableData.id, id, values),
    mutationKey: ["taskEdit"],

    onSuccess: (_data, task) => {
      queryClient.setQueryData<ProjectData>(
        ["getProject", id, pages],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            tasks: oldData.tasks.map((e) => {
              if (e.id == EditableData.id) {
                return {
                  ...e,
                  name: task.name,
                  desc: task.desc,
                  priority: task.priority,
                };
              }
              return e;
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
            <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>

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

              <div className={styles.InputBox}>
                <Label htmlFor="priority">Priority</Label>
                <Dropdown
                  value={formik.values.priority}
                  selectedOptions={[formik.values.priority]}
                  name="priority"
                  onOptionSelect={(_, e) => {
                    formik.setFieldValue("priority", e.optionValue as string);
                  }}
                >
                  {["Low", "Medium", "High"].map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Dropdown>
              </div>
            </DialogContent>

            <DialogActions>
              <Button appearance="primary" type="submit">
                {isEditing ? "Edit Task" : "Create Task"}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default TaskForm;
