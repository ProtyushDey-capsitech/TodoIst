import { api } from "./app";
import type {Project} from "./types.ts";

export const CreateProject = async (PostData: Omit<Project,"id"| "status" |"taskCount">) => {
  const res = await api.post("/Project/postProject", PostData);
  return res.data
};

export const GetAllProject = async (pages:number) => {
  const res = await api.get("/Project/GetAllProject",{params:{Page:pages}});
  return res.data.result
};

export const getProjectById = async (id:string, month:number, year:number, page:number, search:string) => {
  const res = await api.get("/Project/GetProjectById",{params:{projectId:id, Month:month, Year:year, Search:search, Page:page}});
  return res.data.result
};


export const EditProject = async (PostData: Omit<Project,"id"| "status" | "taskCount">,id:string) => {
  const res = await api.patch("/Project/UpdateProject",PostData,{params:{projectId:id}});
  return res.data.result
};

export const UpdatePrjectStatus = async (id:string)=>{
  const res = await api.patch("/Project/UpdateProjectStatus",{},{params:{projectId:id}});
  return res.data
}

export const DeleteProject = async (id:string)=>{
  const res = await api.delete("/Project/DeleteProject",{params:{projectId:id}});
  return res.data.result
}