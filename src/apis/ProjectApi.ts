import { api } from "./app";
import type {Project} from "./types.ts";

export const createProject = async (PostData: Omit<Project,"id"| "status">) => {
  const res = await api.post("/Project/postProject", PostData);
  return res.data
};

export const getAllProject = async () => {
  const res = await api.get("/Project/GetAllProject");
  // https://localhost:5001/api/Todo/getList?Page=1&PageSize=10
  return res.data.result
};