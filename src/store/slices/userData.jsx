import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const storedAuthorization=  JSON.parse(sessionStorage.getItem('Authorization'));

const initialState = {
    Authorization: storedAuthorization,
}

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers:{
       
        initializeLoginData: (state) => {
            const LoginData = localStorage.getItem('LoginData');
            if (LoginData) {
                state.LoginData = JSON.parse(LoginData);
            }
        },
        Authorization: (state, action) => {
            const { token } = action.payload;
            state.Authorization = { ...state.Authorization, token };
            sessionStorage.setItem('Authorization', JSON.stringify(state.Authorization));
        },

        clearAuthorizationToken: (state) => {
            state.Authorization = {};
            sessionStorage.removeItem('Authorization');
        },
        rememberMeUser: (state, action) => {
            const { username, password } = action.payload;
            state.Authorization = { ...state.Authorization, username, password };
            sessionStorage.setItem('Authorization', JSON.stringify(state.Authorization));
        }

    }
})

export const { 
    addLoginData, 
    clearLoginData, 
    initializeLoginData, 
    Authorization, 
    clearAuthorizationToken,
    rememberMeUser
} = userSlice.actions;

export default userSlice.reducer;


