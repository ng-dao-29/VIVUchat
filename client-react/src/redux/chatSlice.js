import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        data: {
            list: [],
            loading: false,
            error: null,
        }
    },

    reducers: {
        startGetChat: (state) => {
            state.data.loading = true;
        },
        getChatSuccess: (state, action) => {
            state.data.loading = false;
            state.data.list = action.payload;
        },
        getChatFailure: (state, action) => {
            state.data.loading = false;
            state.data.error = action.payload;
        },
        addChat: (state, action) => {
            state.data.list = [...state.data.list, action.payload]
        },
        cleanChat: (state) => {
            state.data.loading = false;
            state.data.list = [];
            state.data.error = null
        }
    }
});

export const {
    startGetChat,
    getChatSuccess,
    getChatFailure,
    addChat,
    cleanChat
} = chatSlice.actions;

export default chatSlice;