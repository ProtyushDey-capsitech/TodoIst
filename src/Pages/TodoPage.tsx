import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  Input,
  makeStyles,
  Option,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@fluentui/react-components";
import {
  ClipboardTextEdit20Regular,
  DeleteDismiss20Regular,
} from "@fluentui/react-icons";
import type { Todo } from "../apis/types.ts";
import {
  createTodo,
  DeleteTodo,
  getTodo,
  UpdateStatusApi,
  UpdateTodo,
} from "../apis/todoapi.ts";
import { useNavigate } from "react-router";
import { LogoutUser } from "../apis/AuthApi.ts";
import { useQuery } from "@tanstack/react-query";
// import { LogoutUser } from "../apis/AuthApi.ts";
const useStyle = makeStyles({
  container: {
    backgroundColor: "#e1dfdd",
    maxWidth: "700px",
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    alignItems: "center",
    padding: "20PX",
    minHeight: "100VH",
    height: "full",
  },
  Heading: {
    height: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  HeadingText: {
    fontWeight: "600",
    fontSize: "48px",
  },
  Form: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    width: "90%",
  },
  input: {
    width: "68%",
    padding: "8px 12px",
  },
  dropdown: {
    width: "14%",
    "& button": {
      width: "100%",
    },
  },
  button: {
    width: "14%",
    backgroundColor: "#479ef5",
    ":hover": {
      backgroundColor: "#0f6cbd",
    },
  },
});

function TodoPage() {
  const classes = useStyle();

  const [todo, setTodo] = useState<Omit<Todo, "id" | "isDone">>({
    desc: "",
    status: "Low",
  });
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [toedit, setTOedit] = useState<Omit<Todo, "desc" | "status">>({
    id: "",
    isDone: true,
  });
  const navigate = useNavigate()


  const ResetTodo = () => {
    setTodo({
      desc: "",
      status: "Low",
    });
  };

  const AddData = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.desc) {
      alert("Enter a valid task");
      return;
    }
    const data = await createTodo(todo);
    const Id: string = data ? data.result : "";
    const newTodo: Todo = {
      id: Id,
      isDone: false,
      ...todo,
    };
    const newData: Todo[] = [...todoList, newTodo];
    console.log(newData);
    setTodoList(newData);
    ResetTodo();
  };

  const DeleteData = async (id: string) => {
    await DeleteTodo(id);
    const newData: Todo[] = todoList.filter((e) => {
      return e.id != id;
    });
    if (isEditing && toedit.id == id) {
      ResetTodo();
    }
    setTodoList(newData);
  };

  const UpdateStatus = async (id: string) => {
    await UpdateStatusApi(id);
    const newData: Todo[] = todoList.map((e) => {
      if (e.id == id) {
        return { ...e, isDone: !e.isDone };
      }
      return e;
    });
    setTodoList(newData);
  };

  const ReadyForEdit = (e: Todo) => {
    const edit: boolean = !isEditing;
    setIsEditing(edit);
    const { id, isDone, ...todoWithoutId } = e;
    setTOedit({ id, isDone });
    setTodo(todoWithoutId);
    isEditing ? ResetTodo() : setTodo(todoWithoutId);
  };

  const EditData = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.desc) {
      alert("Enter a valid task");
      return;
    }
    console.log(todo);
    await UpdateTodo(toedit.id, todo);
    const newData: Todo[] = todoList.map((e) => {
      if (e.id == toedit.id) {
        return { ...toedit, ...todo };
      }
      return e;
    });
    setIsEditing(false);
    ResetTodo();
    setTodoList(newData);
  };

  const HandleInput = (name: keyof typeof todo, value: string) => {
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Logout = async () => {
    await LogoutUser();
        navigate("/login");
  }

  const Load = async () => {
    console.time("getTodo");

    const data = await getTodo();

    console.timeEnd("getTodo");
    // console.log(data);
    setTodoList(data?.result);
  };

  useEffect(() => {
    Load();
  }, []);

  const {data} =useQuery<Todo[]>({
    queryKey : ["getTodos"],
    queryFn :  getTodo
  })

  return (
    <div className={classes.container}>
      <div className={classes.Heading}>
        <h1 className={classes.HeadingText}>Todo List</h1>
        <Button className={classes.button} onClick={Logout}>
            Logout
        </Button>
      </div>
      <form
        onSubmit={(e) => (isEditing ? EditData(e) : AddData(e))}
        className={classes.Form}
      >
        <Input
          type="text"
          name="desc"
          required
          onChange={(e) => HandleInput("desc", e.target.value)}
          placeholder="Enter the task"
          value={todo.desc}
          className={classes.input}
        />

        <Dropdown
          className={classes.dropdown}
          value={todo.status}
          selectedOptions={[todo.status]}
          name="status"
          onOptionSelect={(_, e) => {
            HandleInput("status", e.optionValue as string);
            console.log(e);
          }}
        >
          {["Low", "Medium", "High"].map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Dropdown>

        <Button className={classes.button} type="submit">
          {!isEditing ? "Save" : "Edit"}
        </Button>
      </form>
      <Table
        aria-label="Table without semantic HTML elements"
        style={{ width: "100%", tableLayout: "fixed" }}
      >
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ width: "10%" }}>
                <Switch
                  checked={item.isDone}
                  onChange={() => UpdateStatus(item.id)}
                />
              </TableCell>
              <TableCell
                style={{
                  width: "70%",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  textDecoration: item.isDone ? "line-through" : "none"
                }}
              >
                {item.desc}
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <Badge
                  appearance="filled"
                  color={
                    item.status === "Low"
                      ? "success"
                      : item.status === "Medium"
                        ? "informative"
                        : "danger"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell style={{ width: "5%" }}>
                <ClipboardTextEdit20Regular
                  onClick={() => ReadyForEdit(item)}
                />
              </TableCell>
              <TableCell style={{ width: "5%" }}>
                <DeleteDismiss20Regular onClick={() => DeleteData(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TodoPage;
