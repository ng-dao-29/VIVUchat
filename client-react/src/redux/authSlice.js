import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            userData: null,
            loading: false,
            error: null,
        }
    },
    reducers: {
        login: (state) => {
            state.user.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user.loading = false;
            state.user.userData = action.payload;
            state.user.error = null
        },
        loginFailure: (state, action) => {
            state.user.loading = false;
            state.user.error = action.payload;
        },
        setUser: (state, action) => {
            state.user.userData = action.payload;
        },
        setError: (state, action) => {
            state.user.error = action.payload;
        },
        cleanAuth: (state) => {
            state.user.loading = false;
            state.user.userData = {};
            state.user.error = null;
        }
    }
});

export const {
    login,
    loginSuccess,
    loginFailure,
    setUser,
    setError,
    cleanAuth
} = authSlice.actions;

export default authSlice;