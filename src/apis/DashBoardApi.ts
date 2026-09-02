import { api } from "./app.ts";

export const GetCount = async ()=>{
  const res = await api.get("/DashBoard/CountTask");
  return res.data.result
}

export const GetCountStatus = async ()=>{
  const res = await api.get("/DashBoard/GetCountStatus");
  return res.data.result
}

export const GetCountPriority = async ()=>{
  const res = await api.get("/DashBoard/GetCountPriority");
  return res.data.result
}

export const GetProjectTaskCount = async ()=>{
  const res = await api.get("/DashBoard/GetProjectTaskCount");
  return res.data.result
}

export const GetRecentTask = async ()=>{
  const res = await api.get("/DashBoard/GetRecentTask");
  return res.data.result
}