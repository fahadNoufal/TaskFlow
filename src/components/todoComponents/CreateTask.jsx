import React, { useEffect, useRef, useState } from "react";
import "./styles/taskCreateForm.css";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { addTask, editTask } from "../../features/taskList/taskListSlice";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { setMessage } from "../../features/message/messageSlice";

const CreateTask = ({ tl ,titleToEdit='',descriptionToEdit='',edit=false,id=0 }) => {
  const despatch = useDispatch();
  let input1=useRef()
  let input2=useRef()

  const dispatch =useDispatch()
  
  

  function handleCloseTaskCreation(){
    tl.current.pause()
    tl.current.reverse()
  }

  function handleAddTask(){
    tl.current.pause()
    tl.current.reverse()
    setTimeout(() => {
      dispatch(setMessage('New task added!!'))
    }, '1000');
  }
// ________________________________________________________________________________________________

  function handleSubmit() {
    input1.current.blur()
    input2.current.blur()

    setTitle("");
    setDescription("");
    if (edit){

      despatch(editTask({
        title:title,
        description:description,
        id:id,
      }))

    }else{
      despatch(
        addTask({
          title: title,
          description: description,
          id: Math.floor(Math.random() * (99999 - 0 + 1)) + 0,
        })
      );
    }
    handleAddTask();
  }

  const [title, setTitle] = useState(edit?titleToEdit:'');
  const [description, setDescription] = useState(edit?descriptionToEdit:'');

  return (
    <div className=" task-creation-container top-0 bottom-0 left-0 right-0 bg-white z-50 shadow-2xl px-10 py-10 flex flex-col md:rounded-2xl absolute ">
      <div className="black-filter z-50 bg-black top-0 left-0 right-0 bottom-0 absolute ">
        {" "}
      </div>
      <div className="task-form relative h-full w-full flex justify-center items-center ">
        <form
          action=""
          // method="post"
          className=" flex flex-col gap-10 w-full mx-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="inputbox cursor-pointer taskCreate-fields">
            <input
              ref={input1}
              required="required"
              type="text"
              name="title"
              value={title}
              onChange={(el) => {
                setTitle(el.target.value);
              }}
            />
            <span className="taskCreate-feild-title">Task Name</span>
            <i></i>
          </div>
          <div className="inputbox taskCreate-fields">
            <input
              ref={input2}
              required="required"
              name="description"
              type="text"
              value={description}
              onChange={(el) => {
                setDescription(el.target.value);
              }}
              spellCheck="false"
            />

            <span className="taskCreate-feild-title">Description</span>
            <i></i>
          </div>
          <button className="AddTask-btn taskCreate-fields " type="submit">
            Add task{" "}
            <span className="select">
              <PlaylistAddOutlinedIcon />
            </span>{" "}
          </button>
        </form>
        <div
          className="close-create-task border-2 text-black border-solid p-2 rounded-full"
          onClick={handleCloseTaskCreation}
        >
          <CloseOutlinedIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
