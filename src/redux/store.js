import { configureStore } from "@reduxjs/toolkit";
import isMenuDisplayed from '../features/showMenu/showMenuSlice'
import taskList from '../features/taskList/taskListSlice'
import message from '../features/message/messageSlice'

export const store =configureStore({
    reducer: {
        isMenuDisplayed: isMenuDisplayed,
        taskList:taskList,
        message:message
    }
})