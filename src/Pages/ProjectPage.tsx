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
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import ProjectForm from "../Components/ProjectForm";
import { getAllProject } from "../apis/ProjectApi";
import type { Project } from "../apis/types";

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
    WebkitLineClamp: 2,
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
});

const ProjectPage = () => {
  const styles = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<Omit<Project,"status">>(
    
  )

    const ReadyforEdit = ()=>{
        setOpen(true); 
        setIsEditing(true)

    }

  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["getProjects"],
    queryFn: getAllProject,
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
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  {/* STATUS */}
                  <TableCell className={styles.cell}>
                    <Dropdown
                      className={styles.statusDropdown}
                      size="small"
                      value={item.status ? "Done" : "Pending"}
                      selectedOptions={[item.status ? "done" : "pending"]}
                      onOptionSelect={(_, option) => {
                        const isDone = option.optionValue === "done";

                        // UpdateStatus.mutate({
                        //   id: item.id,
                        //   status: isDone,
                        // });
                      }}
                    >
                      <Option value="pending">Pending</Option>

                      <Option value="done">Done</Option>
                    </Dropdown>
                  </TableCell>

                  {/* PROJECT NAME */}
                  <TableCell className={styles.cell}>
                    <span
                      style={{
                        textDecoration: item.status ? "line-through" : "none",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.name}
                    </span>
                  </TableCell>

                  {/* DESCRIPTION */}
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

                  {/* TASK COUNT */}
                  <TableCell className={`${styles.cell} ${styles.tasks}`}>
                    {/* {item.taskCount ?? 0} */}
                    10
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className={styles.cell}>
                    <div className={styles.actions}>
                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<Open20Regular />}
                        aria-label="View project"
                        title="View project"
                        // onClick={() =>
                        //   navigate(`/projects/${item.id}`)
                        // }
                      />

                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<ClipboardTextEdit20Regular />}
                        aria-label="Edit project"
                        title="Edit project"
                        onClick={() => ReadyforEdit()}
                      />

                      <Button
                        className={styles.actionButton}
                        appearance="subtle"
                        icon={<DeleteDismiss20Regular />}
                        aria-label="Delete project"
                        title="Delete project"
                        // onClick={() =>
                        //   DeleteProject.mutate(item.id)
                        // }
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
    </div>
  );
};

export default ProjectPage;
