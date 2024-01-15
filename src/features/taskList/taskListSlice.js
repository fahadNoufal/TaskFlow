import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:[
        {
          title: "Complete one task",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "21m",
          completed:false,
          id:1,
        },
        {
          title: "Tap to know more info",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "1h 7m",
          completed:false,
          id:2,
        },
        {
          title: "Double tap to complete",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "2h",
          completed:false,
          id:4,
        },  
        {
          title: "Fill the progress bar",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "1h 22m",
          completed:false,
          id:3,
        },
        {
          title: "Do laundry",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "3h",
          completed:false,
          id:6,
        },
        {
          title: "Check your mails",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "4h 4m",
          completed:false,
          id:14,
        },
        {
          title: "Review template",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus est nesciunt ex provident culpa optio accusamus soluta. Maxime non ipsa, cum delectus minima sequi. Animi eveniet obcaecati eius corrupti vel!",
          since: "4h 4m",
          completed:false,
          id:14,
        },
      ]
}


const taskListSlice=createSlice({
    name:'taskList',
    initialState,
    reducers:{
        addTask: (state, { payload }) => {
          const newTask = {
            title: payload.title,
            description: payload.description,
            since: '1m',
            id:payload.id,
            completed: false
          };
        
          const newState = {
            ...state,
            data: [newTask, ...state.data]
          };

          console.log(newState.data);
        
          return newState;
        },
        removeTask:(state,{payload})=>{
            let data=state.data;
            let newData=data.filter((task)=>(!(task.id===payload)))
            state.data=newData
        },
        toggleTaskComplete:(state,{payload})=>{
            let data=state.data;
            let newData=data.map((task)=>(task.id===payload)?{...task,completed:!task.completed}:{...task})
            state.data=newData
        },
        editTask: (state,{payload})=>{
            let newData= state.data.map((task)=>(task.id===payload.id?{...task,description:payload.description,title:payload.title}:{...task}))
            state.data=newData;
        }
    }
})

export const {addTask,removeTask,toggleTaskComplete,editTask}=taskListSlice.actions
export default taskListSlice.reducer