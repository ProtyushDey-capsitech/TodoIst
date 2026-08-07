import  { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TodoSate {
    Token: string;
}

const initialState : TodoSate = {Token:localStorage.getItem("TO_Access") || ""};

const todoCounterSlice = createSlice({
    name: "tokenCounter",
    initialState,
    reducers: {
        LoginState:(state: TodoSate , action: PayloadAction<string>) =>{
            state.Token = action.payload;
            localStorage.setItem("TO_Access",action.payload);
        },
        LogoutState:(state: TodoSate ,) =>{
            state.Token = "";
            localStorage.setItem("TO_Access","");
        },
    }
})

export const {LoginState, LogoutState} = todoCounterSlice.actions;
export default todoCounterSlice.reducer;
