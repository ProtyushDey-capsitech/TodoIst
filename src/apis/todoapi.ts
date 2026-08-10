import { api } from "./app";
import type {Todo} from "./types.ts";

export const createTodo = async (PostData: Omit<Todo,"id"| "isDone">) => {
  const res = await api.post("/Todo/postData", PostData);
  return res.data
};

export const getTodo = async () => {
  const res = await api.get("/Todo/getList");
  return res.data.result
};
export const UpdateStatusApi = async (taskid:string) => {
  const res = await api.put("/Todo/UpdateStatus",{},{params:{id:taskid}});
  return res.data
};

export const UpdateTodo = async (taskid:string , PostData: Omit<Todo, "id" | "isDone">)=>{
  console.log(PostData)
  const res = await api.patch("/Todo/UpdateWork" , PostData , {params:{id:taskid}} )
  return res.data;
}

export const DeleteTodo = async (taskid:string)=>{
  const res = await api.delete("/Todo/Delete" ,{params:{id:taskid}} )
  return res.data;
}