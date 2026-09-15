import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "../apis/types";


const initialState: UserData = {
  name: "",
  email: "",
  id: "",
  role:""
};

const todoCounterSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    LoginState: (
      state,
      action: PayloadAction<UserData>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.role = action.payload.role
    },

    LogoutState: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
      state.role="";
    },
  },
});

export const {
  LoginState,
  LogoutState,
} = todoCounterSlice.actions;

export default todoCounterSlice.reducer;