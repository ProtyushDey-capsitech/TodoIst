export interface UserData{
      "id": string,
      "name": string,
      "email": string,
}

export interface Task {
  id: string;
  name: string;
  desc: string;
  priority: string;
  status: string;
  createdAt: string;
}

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  phoneNumber: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
}

export interface Project {
  name: string;
  id: string;
  desc: string;
  status: boolean;
  taskCount: number;
}

export interface Pagination<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface taskproject extends Task{
  projectName: string
  projectId: string,
}

export interface getalltask extends StatusCount{
    tasks:taskproject[]
}

export interface ProjectDataName {
  id: string;
  name: string;
}

export interface ProjectData extends ProjectDataName {
  tasks: Task[];
  taskCount: number;
  status: boolean;
  desc: string;
}

export interface OtpPayload {
  sessionId: string;
  otp: string;
}

export interface DashCardcount{
  inprogressTask: number;
  todoTask: number;
  totalProject: number;
  totalTask: number;
}

export interface PriorityCount{
    priority: string,
    count:number
}

export interface StatusCount{
    status: string,
    count:number
}

export interface ProjectStatusCount{
  name:string
  count:StatusCount[]
}

export interface RecentTask{
      "id": string,
      "projectId": string,
      "name": string,
      "desc": string,
      "status": string,
      "priority": string,
      "projectName": string
}


