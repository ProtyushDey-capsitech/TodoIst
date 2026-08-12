export interface Todo {
  id: string;
  desc: string;
  isDone: boolean;
  status: string;
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
  },
  role:string
}

export interface Project {
  name: string;
  id: string;
  desc: string;
  status: boolean;
}