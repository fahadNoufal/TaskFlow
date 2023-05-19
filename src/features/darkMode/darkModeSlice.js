import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice= createSlice({
    name:'darkMode',
    initialState:{
        darkMode:true,
    },
    reducers:{
        toggleDarkMode:(state)=>{
            state.darkMode = !state.darkMode;
        }
    }
})

export default darkModeSlice.reducer
export const {toggleDarkMode} = darkModeSlice.actions