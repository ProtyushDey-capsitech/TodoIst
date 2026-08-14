// import { useState } from "react";
// import {
//   Badge,
//   Button,
//   Dropdown,
//   Input,
//   makeStyles,
//   Option,
//   Switch,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "@fluentui/react-components";
// import {
//   ClipboardTextEdit20Regular,
//   DeleteDismiss20Regular,
// } from "@fluentui/react-icons";
// import type { Todo } from "../apis/types.ts";
// import {
//   createTodo,
//   DeleteTodo,
//   getTodo,
//   UpdateStatusApi,
//   UpdateTodo,
// } from "../apis/TaskApi.ts";
// import { useNavigate } from "react-router";
// import { LogoutUser } from "../apis/AuthApi.ts";
// import {
//   keepPreviousData,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
//  import { useFormik } from 'formik';
// // import { LogoutUser } from "../apis/AuthApi.ts";
// const useStyle = makeStyles({
//   container: {
//     backgroundColor: "#e1dfdd",
//     maxWidth: "700px",
//     marginInline: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "40px",
//     alignItems: "center",
//     padding: "20PX",
//     minHeight: "100VH",
//     height: "full",
//   },
//   Heading: {
//     height: "fit-content",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "70%",
//   },
//   HeadingText: {
//     fontWeight: "600",
//     fontSize: "48px",
//   },
//   Form: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: "8px",
//     width: "90%",
//   },
//   input: {
//     width: "68%",
//     padding: "8px 12px",
//   },
//   dropdown: {
//     width: "14%",
//     "& button": {
//       width: "100%",
//     },
//   },
//   button: {
//     width: "14%",
//     backgroundColor: "#479ef5",
//     ":hover": {
//       backgroundColor: "#0f6cbd",
//     },
//   },
// });

function TodoPage() {
  // const classes = useStyle();
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();


  // const [page, setPage] = useState<number>(1);
  // const [isEditing, setIsEditing] = useState<Boolean>(false);
  // const [toedit, setTOedit] = useState<string>("");
  // const formik = useFormik({
  //   initialValues:{
  //     desc:"",
  //     status:"Low"
  //   },
  //   onSubmit:(values ,{ resetForm })=> {
  //     isEditing?EditData.mutate(values):AddData.mutate(values)
  //     resetForm()
  //   }
  // })



  // const ReadyForEdit = (e: Todo) => {
  //   const edit: boolean = !isEditing;
  //   setIsEditing(edit);
  //   const { id, isDone, ...todoWithoutId } = e;
  //   setTOedit( id);
  //   formik.setValues({desc:todoWithoutId.desc , status:todoWithoutId.status});
  //   isEditing ? formik.setValues({desc:"" , status:"Low"}) : formik.setValues({desc:todoWithoutId.desc , status:todoWithoutId.status});
  // };
  
  // const Logout = async () => {
  //   await LogoutUser();
  //   navigate("/login");
  // };
  
  // const EditData = useMutation({
  //   mutationFn : (todo: Omit<Todo, "id" | "isDone">)=>UpdateTodo(toedit , todo),
  //   onSuccess: (_data ,todo: Omit<Todo, "id" | "isDone">) => {
  //     queryClient.setQueryData<Todo[]>(["getTodos", page], (oldData) => {
  //       return oldData?.map((task) => {
  //         if (task.id == toedit) {
  //           return { ...task, desc:todo.desc, status:todo.status };
  //         }
  //         return task;
  //       });
  //     });
  //   },
  // })

  // const UpdateStatus = useMutation({
  //   mutationFn: (id: string) => UpdateStatusApi(id),
  //   onSuccess: (_data, id: string) => {
  //     queryClient.setQueryData<Todo[]>(["getTodos", page], (oldData) => {
  //       return oldData?.map((task) => {
  //         if (task.id == id) {
  //           return { ...task, isDone: !task.isDone };
  //         }
  //         return task;
  //       });
  //     });
  //   },
  // });

  // const DeleteData = useMutation({
  //   mutationFn: (id: string) => DeleteTodo(id),
  //   onSuccess: (_data, id: string) => {
  //     queryClient.setQueryData<Todo[]>(["getTodos", page], (oldData) => {
  //       return oldData?.filter((task) => task.id != id);
  //     });
  //   },
  // });

  // const AddData = useMutation({
  //   mutationFn: (todo: Omit<Todo, "id" | "isDone">) => createTodo(todo),
  //   onSuccess: (_data, todo: Omit<Todo, "id" | "isDone">) => {
  //     queryClient.setQueryData<Todo[]>(["getTodos", page], (oldData) => {
  //       const taskId = _data.result;
  //       const newTodo: Todo = {
  //         id: taskId,
  //         isDone: false,
  //         ...todo,
  //       };
  //       return[newTodo , ...(oldData??[])]
  //     });
  //   },
  // });

  // const { data } = useQuery<Todo[]>({
  //   queryKey: ["getTodos", page],
  //   queryFn: () => getTodo(page),
  //   placeholderData: keepPreviousData,
    
  //   // staleTime:1000,
  //   // refetchInterval:10000,
  //   // refetchIntervalInBackground:true
  // });

  return (
    // <div className={classes.container}>
    //   <div className={classes.Heading}>
    //     <h1 className={classes.HeadingText}>Todo List</h1>
    //     <Button className={classes.button} onClick={Logout}>
    //       Logout
    //     </Button>
    //   </div>
    //   <form
    //     onSubmit={formik.handleSubmit}
    //     className={classes.Form}
    //   >
    //     <Input
    //       type="text"
    //       name="desc"
    //       required
    //       onChange={formik.handleChange}
    //       placeholder="Enter the task"
    //       value={formik.values.desc}
    //       className={classes.input}
    //     />

    //     <Dropdown
    //       className={classes.dropdown}
    //       value={formik.values.status}
    //       selectedOptions={[formik.values.status]}
    //       name="status"
    //       onOptionSelect={(_, e) => {
    //         formik.setFieldValue("status", e.optionValue as string);
    //       }}
    //     >
    //       {["Low", "Medium", "High"].map((option) => (
    //         <Option key={option} value={option}>
    //           {option}
    //         </Option>
    //       ))}
    //     </Dropdown>

    //     <Button className={classes.button} type="submit">
    //       {!isEditing ? "Save" : "Edit"}
    //     </Button>
    //   </form>
    //   <Table
    //     aria-label="Table without semantic HTML elements"
    //     style={{ width: "100%", tableLayout: "fixed" }}
    //   >
    //     <TableBody>
    //       {data?.map((item) => (
    //         <TableRow key={item.id}>
    //           <TableCell style={{ width: "10%" }}>
    //             <Switch
    //               checked={item.isDone}
    //               onChange={() => UpdateStatus.mutate(item.id)}
    //             />
    //           </TableCell>
    //           <TableCell
    //             style={{
    //               width: "70%",
    //               whiteSpace: "normal",
    //               wordBreak: "break-word",
    //               textDecoration: item.isDone ? "line-through" : "none",
    //             }}
    //           >
    //             {item.desc}
    //           </TableCell>
    //           <TableCell style={{ width: "10%" }}>
    //             <Badge
    //               appearance="filled"
    //               color={
    //                 item.status === "Low"
    //                   ? "success"
    //                   : item.status === "Medium"
    //                     ? "informative"
    //                     : "danger"
    //               }
    //             >
    //               {item.status}
    //             </Badge>
    //           </TableCell>
    //           <TableCell style={{ width: "5%" }}>
    //             <ClipboardTextEdit20Regular
    //               onClick={() => ReadyForEdit(item)}
    //             />
    //           </TableCell>
    //           <TableCell style={{ width: "5%" }}>
    //             <DeleteDismiss20Regular
    //               onClick={() => DeleteData.mutate(item.id)}
    //             />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>

    //   <div>
    //     <button onClick={() => setPage(page - 1)} disabled={page < 2}>
    //       prev
    //     </button>
    //     <p>{page}</p>
    //     <button onClick={() => setPage(page + 1)}>next</button>
    //   </div>
    // </div>
    <></>
  );
}

export default TodoPage;
