import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../app/Store";



export const userSlice = createSlice({
    name: 'storage',
    initialState: {
        usertoken: null
    },
    reducers:{
        login: (state, action) => {
          state.usertoken = action.payload;
        },
        logout: (state) =>{
          state.usertoken = null;
        }
    }
})

export const { login, logout } = userSlice.actions

// export const selectUser = (state: RootState) => state.usertoken

export default userSlice.reducer