import { api } from "./app.ts";
import type {Task} from "./types.ts";

export const createTask = async (postData:Omit<Task,"id"|"status"|"createdAt"> , pid:string) => {
  const res = await api.post("/Task/postData", postData,{params:{projectId:pid}});
  return res.data
};

// export const getTodo = async (page:number) => {
//   const res = await api.get("/Todo/getList",{params:{Page:page}});
//   // https://localhost:5001/api/Todo/getList?Page=1&PageSize=10
//   return res.data.result
// };
export const UpdateTaskStatus = async (taskid:string, status:string) => {
  const res = await api.patch("/Task/UpdateStatus",{},{params:{id:taskid,status:status}});
  return res.data
};

export const UpdateTask = async (taskid:string , pid:string, postData:Omit<Task,"id"|"status"|"createdAt">)=>{
  const res = await api.patch("/Task/Updatetask" , postData , {params:{id:taskid,projectId:pid}} )
  return res.data;
}

export const DeleteTask = async (id:string)=>{
  const res = await api.delete("/Task/DeleteTask" ,{params:{id:id}} )
  return res.data;
}