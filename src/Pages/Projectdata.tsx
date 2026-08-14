import {
  Button,
  Card,
  Dropdown,
  makeStyles,
  Option,
  Spinner,
  Text,
  Input,
  Badge,
} from "@fluentui/react-components";

import {
  Add20Regular,
  ArrowLeft20Regular,
  Search20Regular,
  CalendarMonth20Regular,
  Edit20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProjectById } from "../apis/ProjectApi.ts";
import TaskForm from "../Components/TaskForm.tsx";
import type { ProjectData, Task } from "../apis/types.ts";
import { DeleteTask } from "../apis/TaskApi.ts";

const useStyles = makeStyles({
  page: {
    padding: "24px",
    width: "100%",
    maxWidth: "90%",
    margin: "0 auto",

    "@media (max-width: 768px)": {
      padding: "12px",
      maxWidth: "100%",
    },
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  projectbox: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",

    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },

  Projectsection: {
    width: "42%",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",

    backgroundColor: "#f5f9ff",

    "@media (max-width: 768px)": {
      width: "100%",
      padding: "24px",
    },
  },

  projectLabel: {
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#616161",
  },

  projectHeading: {
    fontSize: "38px",
    lineHeight: "1.15",
    fontWeight: 700,
    margin: 0,
    color: "#242424",
    overflowWrap: "anywhere",

    "@media (max-width: 768px)": {
      fontSize: "30px",
    },
  },

  projectDescription: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#616161",
    margin: 0,
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },

  projectDetails: {
    display: "flex",
    gap: "10px",
    padding: "5px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    border: "1px solid #e1e7ef",
    width: "120px",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  detailLabel: {
    color: "#616161",
    fontSize: "14px",
  },

  addTaskButton: {
    marginTop: "auto",
    width: "100%",
    minHeight: "44px",
  },

  Tasksection: {
    width: "58%",
    padding: "32px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "24px",

    "@media (max-width: 768px)": {
      width: "100%",
      padding: "24px",
    },
  },

  taskHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",

    "@media (max-width: 500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  taskHeading: {
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },
  taskCount: {
    color: "#616161",
    fontSize: "14px",
  },

  filters: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",

    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },

  searchBox: {
    flex: 1,
    minWidth: 0,
  },

  dateFilter: {
    minWidth: "130px",

    "@media (max-width: 600px)": {
      width: "100%",
    },
  },

  tasksContainer: {
    flex: 1,
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  emptyTasks: {
    flex: 1,
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "12px",
    border: "1px dashed #d1d1d1",
    backgroundColor: "#fafafa",
  },

  emptyText: {
    color: "#616161",
  },

  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    paddingTop: "10px",
    borderTop: "1px solid #e5e5e5",

    "@media (max-width: 500px)": {
      flexWrap: "wrap",
    },
  },

  pageButton: {
    minWidth: "36px",
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },

  empty: {
    padding: "40px",
    textAlign: "center",
  },

  taskCard: {
    padding: "12px",
    paddingInline: "15px",
    border: "1px solid #e1e1e1",
    borderRadius: "10px",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    width: "100%",
    boxSizing: "border-box",
  },

  taskTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    minWidth: 0,

    "@media (max-width: 700px)": {
      flexDirection: "column",
      alignItems: "stretch",
      gap: "10px",
    },
  },

  taskTitleSection: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    justifyContent: "start",
    gap: "12px",
    minWidth: 0,
    flex: 1,
    width: "100%",

    "@media (max-width: 600px)": {
      flexWrap: "wrap",
      gap: "8px",
    },
  },

  tasktitleStatus: {
    display: "flex",
    gap: "10px",
  },

  taskName: {
    fontSize: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
    flex: 1,

    "@media (max-width: 600px)": {
      flexBasis: "100%",
      width: "100%",
      whiteSpace: "normal",
      overflow: "visible",
      textOverflow: "unset",
      overflowWrap: "anywhere",
    },
  },

  taskDate: {
    fontSize: "13px",
    color: "#616161",
    whiteSpace: "nowrap",

    "@media (max-width: 600px)": {
      flexShrink: 0,
    },
  },

  taskActions: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,

    "@media (max-width: 700px)": {
      width: "100%",
      justifyContent: "start",
      flexWrap: "wrap",
    },

    "@media (max-width: 400px)": {
      justifyContent: "space-between",
    },
  },

  deleteButton: {
    color: "#d13438",
  },

  statusDropdown: {
    width: "90px",
    minWidth: "90px",

    "@media (max-width: 400px)": {
      flex: 1,
      minWidth: "100px",
      maxWidth: "150px",
    },
  },
});

const Projectdata = () => {
  const queryClient = useQueryClient();
  const styles = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [editableData, setEditableData] = useState<
    Omit<Task, "status" | "createdAt">
  >({
    id: "",
    name: "",
    desc: "",
    priority: "Low",
  });
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ReadyforEdit = (
    id: string,
    name: string,
    desc: string,
    prior: string,
  ) => {
    const task: Omit<Task, "status" | "createdAt"> = {
      id: id,
      name: name,
      desc: desc,
      priority: prior,
    };
    setEditableData(task);
    setOpen(true);
    setIsEditing(true);
  };

  const Delete = useMutation({
    mutationFn: (taskid: string) => DeleteTask(taskid),
    mutationKey: ["taskDelete"],
    onSuccess: (_data, task) => {
      queryClient.setQueryData<ProjectData>(
        ["getProject", id, pages],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            tasks: oldData.tasks.filter((e) => e.id != task).slice(0, 5),
            taskCount: oldData.taskCount + 1,
          };
        },
      );
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProject", id, pages],
    queryFn: () => getProjectById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner label="Loading project..." />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.empty}>
        <Text>Unable to load project.</Text>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* top*/}
      <div className={styles.topBar}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft20Regular />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button
          appearance="secondary"
          icon={<Edit20Regular />}
          //   onClick={() => setTaskModalOpen(true)}
        >
          Edit Project
        </Button>
      </div>

      {/* main */}
      <div className={styles.projectbox}>
        {/* left side */}
        <div className={styles.Projectsection}>
          <Text className={styles.projectLabel}>Project</Text>

          <h1 className={styles.projectHeading}>{data.name}</h1>

          <p className={styles.projectDescription}>{data.desc}</p>

          <div className={styles.projectDetails}>
            <div className={styles.detailRow}>
              <Text className={styles.detailLabel}>Status:</Text>

              {data.status ? "Done" : "Pending"}
            </div>

            <div className={styles.detailRow}></div>

            <div className={styles.detailRow}></div>
          </div>
        </div>

        {/*right side*/}
        <div className={styles.Tasksection}>
          <div className={styles.taskHeader}>
            <div>
              <h2 className={styles.taskHeading}>Tasks</h2>

              <Text className={styles.taskCount}>
                Manage your project tasks
              </Text>
            </div>

            <Button
              appearance="primary"
              icon={<Add20Regular />}
              onClick={() => setOpen(true)}
            >
              Add Task
            </Button>
          </div>
          <TaskForm
            modalopen={open}
            modaldisplay={() => {
              setOpen(false);
              setIsEditing(false);
            }}
            isEditing={isEditing}
            id={id ?? ""}
            EditableData={editableData}
            pages={pages}
          />

          {/* filters */}
          <div className={styles.filters}>
            <Input
              className={styles.searchBox}
              placeholder="Search tasks..."
              contentBefore={<Search20Regular />}
            />
            <Dropdown
              className={styles.dateFilter}
              placeholder="Month"
              value={
                [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ][month - 1]
              }
              onOptionSelect={(_, data) => {
                setMonth(Number(data.optionValue));
                console.log(data.optionValue ?? "1");
              }}
            >
              <Option value="1">January</Option>
              <Option value="2">February</Option>
              <Option value="3">March</Option>
              <Option value="4">April</Option>
              <Option value="5">May</Option>
              <Option value="6">June</Option>
              <Option value="7">July</Option>
              <Option value="8">August</Option>
              <Option value="9">September</Option>
              <Option value="10">October</Option>
              <Option value="11">November</Option>
              <Option value="12">December</Option>
            </Dropdown>
            <Dropdown
              className={styles.dateFilter}
              placeholder="Year"
              value={["2024", "2025", "2026"][year - 2024]}
              onOptionSelect={(_, data) => {
                setYear(Number(data.optionValue));
                console.log(data.optionValue);
              }}
            >
              <Option value="2024">2024</Option>
              <Option value="2024">2025</Option>
              <Option value="2024">2026</Option>
            </Dropdown>
          </div>

          {/* list */}
          <div className={styles.tasksContainer}>
            {data.tasks?.length === 0 ? (
              <div className={styles.emptyTasks}>
                <CalendarMonth20Regular />

                <Text size={400} weight="semibold">
                  No tasks found
                </Text>

                <Text className={styles.emptyText}>
                  Create a task to get started
                </Text>
              </div>
            ) : (
              data.tasks?.map((task: Task) => (
                <Card key={task.id} className={styles.taskCard}>
                  <div className={styles.taskTop}>
                    <div className={styles.taskTitleSection}>
                      <Text weight="semibold" className={styles.taskName}>
                        {task.name}
                      </Text>
                      <div className={styles.tasktitleStatus}>
                        <Text className={styles.taskDate}>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </Text>
                        <Badge
                          appearance="filled"
                          color={
                            task.priority === "Low"
                              ? "success"
                              : task.priority === "Medium"
                                ? "informative"
                                : "danger"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className={styles.taskActions}>
                      <Dropdown
                        className={styles.statusDropdown}
                        size="small"
                        value={task.status}
                        selectedOptions={[task.status]}
                        onOptionSelect={(_) => {
                          // UpdateStatus.mutate(task.id);
                        }}
                      >
                        <Option value="pending">Pending</Option>

                        <Option value="done">Done</Option>
                      </Dropdown>
                      <Button
                        appearance="subtle"
                        icon={<Edit20Regular />}
                        aria-label="Edit task"
                        onClick={() =>
                          ReadyforEdit(
                            task.id,
                            task.name,
                            task.desc,
                            task.priority,
                          )
                        }
                      />
                      <Button
                        appearance="subtle"
                        icon={<Delete20Regular />}
                        className={styles.deleteButton}
                        aria-label="Delete task"
                        onClick={() => Delete.mutate(task.id)}
                      />
                    </div>
                  </div>

                  <Text>{task.desc}</Text>
                </Card>
              ))
            )}
          </div>

          {/* pagination */}
          <div className={styles.pagination}>
            <Button className={styles.pageButton} appearance="subtle">
              Previous
            </Button>
            <p>1</p>
            <Button className={styles.pageButton} appearance="subtle">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projectdata;
