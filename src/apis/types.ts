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

export interface ProjectData {
  tasks: Task[];
  id: string;
  taskCount: number;
  status: boolean;
  name: string;
  desc: string;
}

export interface OtpPayload {
  sessionId: string;
  otp: string;
}
