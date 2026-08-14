import {
  Button,
  Dropdown,
  Option,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import {
  ClipboardTextEdit20Regular,
  DeleteDismiss20Regular,
  Open20Regular,
} from "@fluentui/react-icons";

import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import ProjectForm from "../Components/ProjectForm";
import { GetAllProject, DeleteProject, UpdatePrjectStatus } from "../apis/ProjectApi";
import type { Project, Pagination } from "../apis/types";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  page: {
    width: "100%",
    padding: "24px",
    boxSizing: "border-box",

    "@media (max-width: 600px)": {
      padding: "16px",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "16px",

    "@media (max-width: 500px)": {
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "600",
  },
  subtitle: {
    margin: 0,
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
  },
  addButton: {
    minWidth: "120px",
  },
  tableContainer: {
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
  },
  table: {
    width: "100%",
    minWidth: "900px",
    tableLayout: "fixed",
  },
  headerCell: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: "600",
    padding: "12px 16px",
    whiteSpace: "nowrap",
  },
  cell: {
    padding: "12px 16px",
    verticalAlign: "middle",
    overflow: "hidden",
  },
  description: {
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  statusDropdown: {
    width: "90px",
    minWidth: "90px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    whiteSpace: "nowrap",
  },
  actionButton: {
    minWidth: "32px",
    width: "32px",
    height: "32px",
    padding: "4px",
  },
  tasks: {
    textAlign: "center",
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
  },
  paginationbox:{
    display:"flex",
    justifyContent:"center",
    marginTop:"20px",
    gap: "10px",
    alignItems:"center",
    fontSize:"16px"
  },
  paginationbutton:{
    height:"30px",
    width:"30px",
    boxShadow:tokens.shadow2,
    borderRadius:"5px"
  }
});

const ProjectPage = () => {
  const styles = useStyles();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1)
  const [editableData, setEditableData] = useState<
    Omit<Project, "status" | "taskCount">
  >({
    id: "",
    name: "",
    desc: "",
  });

  const ReadyforEdit = (id: string, name: string, desc: string) => {
    const project: Omit<Project, "status" | "taskCount"> = {
      id: id,
      name: name,
      desc: desc,
    };
    console.log(project);
    setEditableData(project);
    setOpen(true);
    setIsEditing(true);
  };
  
  const Delete = useMutation({
    mutationFn: (id: string) => DeleteProject(id),
    mutationKey: ["ProjectDelete"],
    onSuccess: (_data, id: string) => {
      queryClient.setQueryData<Pagination<Project>>(
        ["getProjects",pages],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            total: Math.max(0, oldData.total - 1),
            results: oldData.results.filter((project) => project.id !== id),
          };
        },
      );
    },
  });

const UpdateStatus = useMutation({
  mutationFn: (id: string) => UpdatePrjectStatus(id),

  mutationKey: ["ProjectStatus"],

  onSuccess: (_data, id) => {
    if (!_data.status) {
      console.log("Something went wrong:", _data.message);
      return;
    }

    queryClient.setQueryData<Pagination<Project>>(
      ["getProjects", pages],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          results: oldData.results.map((project) => {
            if (project.id === id) {
              return {
                ...project,
                status: !project.status,
              };
            }

            return project;
          }),
        };
      }
    );
  },
});

  const { data, isLoading } = useQuery<Pagination<Project>>({
    queryKey: ["getProjects",pages],
    queryFn: ()=>GetAllProject(pages),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Manage your projects and tasks</p>
        </div>

        <Button
          className={styles.addButton}
          appearance="primary"
          onClick={() => setOpen(true)}
        >
          + Add Project
        </Button>
      </div>

      <ProjectForm
        modalopen={open}
        modaldisplay={() => {
          setOpen(false);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        EditableData={editableData}
        pages={pages}
      />

      {/* project table */}
      <div className={styles.tableContainer}>
        <Table aria-label="Projects table" className={styles.table}>
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>

          <TableHeader>
            <TableRow>
              <TableHeaderCell className={styles.headerCell}>
                Status
              </TableHeaderCell>

              <TableHeaderCell className={styles.headerCell}>
                Project
              </TableHeaderCell>

              <TableHeaderCell className={styles.headerCell}>
                Description
              </TableHeaderCell>

              <TableHeaderCell className={styles.headerCell}>
                Tasks
              </TableHeaderCell>

              <TableHeaderCell className={styles.headerCell}>
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className={styles.empty}>Loading projects...</div>
                </TableCell>
              </TableRow>
            ) : data && data.results.length > 0 ? (
              data.results.map((item) => (
                <TableRow key={item.id}>
                  {/* project status */}
                  <TableCell className={styles.cell}>
                    <Dropdown
                      className={styles.statusDropdown}
                      size="small"
                      value={item.status ? "Done" : "Pending"}
                      selectedOptions={[item.status ? "done" : "pending"]}
                      onOptionSelect={(_) => {
                        UpdateStatus.mutate(item.id);
                      }}
                    >
                      <Option value="pending">Pending</Option>

                      <Option value="done">Done</Option>
                    </Dropdown>
                  </TableCell>

                  {/* project name */}
                  <TableCell className={styles.cell}>
                    <span
                      className={styles.description}
                      style={{
                        textDecoration: item.status ? "line-through" : "none",
                      }}
                    >
                      {item.name}
                    </span>
                  </TableCell>

                  {/* project  dcesc*/}
                  <TableCell className={styles.cell}>
                    <div
                      className={styles.description}
                      style={{
                        textDecoration: item.status ? "line-through" : "none",
                      }}
                    >
                      {item.desc}
                    </div>
                  </TableCell>

                  {/* task count */}
                  <TableCell className={styles.cell}>
                    {item.taskCount}
                  </TableCell>

                  {/* action button */}
                  <TableCell className={styles.cell}>
                    <div className={styles.actions}>
                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<Open20Regular />}
                        aria-label="View project"
                        title="View project"
                        onClick={() =>
                          navigate(`/project/${item.id}`)
                        }
                      />

                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<ClipboardTextEdit20Regular />}
                        aria-label="Edit project"
                        title="Edit project"
                        onClick={() =>
                          ReadyforEdit(item.id, item.name, item.desc)
                        }
                      />

                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<DeleteDismiss20Regular />}
                        aria-label="Delete project"
                        title="Delete project"
                        onClick={() => Delete.mutate(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className={styles.empty}>No projects found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination button */}
      <div className={styles.paginationbox}>
        <button disabled={pages<2} onClick={()=>setPages(pages-1)} className={styles.paginationbutton}>P</button>
        <p>{pages}</p>
        <button disabled={pages >= Math.ceil((data?.total ?? 0) / 10)} onClick={()=>setPages(pages+1)} className={styles.paginationbutton}>N</button>
        </div>
    </div>
  );
};

export default ProjectPage;
