import { createSlice } from "@reduxjs/toolkit";

const editingItemSlice=createSlice({
    name:"editingItem",
    initialState:{item:false},
    reducers:{
        setEditingItem:(state,{payload})=>{
            state.item=payload;
        }
    }
})


export default editingItemSlice.reducer
export const {setEditingItem} = editingItemSlice.actions