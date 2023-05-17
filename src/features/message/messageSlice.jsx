import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:'message',
    initialState: {message: ''},
    reducers: {
        setMessage: (state, action) => {
            
        }
    }
})

export const {setMessage} = messageSlice.actions;

export default messageSlice.reducer;