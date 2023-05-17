import { createSlice } from "@reduxjs/toolkit";

const isMenuDisplayed=createSlice({
    name:"showMenu",
    initialState:{displayed:false},
    reducers:{
        toggleMenu:(state)=>{
            state.displayed=!state.displayed;
        }
    }
})

export const {toggleMenu}=isMenuDisplayed.actions
export default isMenuDisplayed.reducer
