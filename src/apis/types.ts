
export interface Todo {
  id: string;
  desc: string;
  isDone: boolean;
  status:string
}

export interface LoginPayload {
  userName: string; 
  password: string;
}
