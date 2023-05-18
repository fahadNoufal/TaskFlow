import React, { useRef } from "react";
import Navbar from "./todoComponents/Navbar";
import Header from "./todoComponents/Header";
import Tasks from "./todoComponents/Tasks";
import Menu from "./todoComponents/Menu";
import CreateTask from "./todoComponents/CreateTask";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { setMessage } from "../features/message/messageSlice";



const TaskView = () => {

  //setting the height of the body to the height of the window so that 
  // the height will not be affected by the navigation bar or other things in the browser
  // this is mainly to avoid scrolling in mobile devices
  window.addEventListener('load', function() {
    var bodyElement = document.querySelector('body');
    bodyElement.style.height = window.innerHeight + 'px';
  });

  const tl=useRef()
  const dispatch =useDispatch()

  function handleTaskCreation(){
    tl.current=gsap.timeline()
      
    tl.current.to('.task-creation-container',{
      y:'0',
      ease:'back.out(0.3)',
      duration:0.5,
    })
    tl.current.to('.black-filter',{
      height:0,
      duration:0.3,
      ease:'power3.out'
    })
    tl.current.to('.taskCreate-fields',{
      y:0,
      opacity:1,
      duration:0.5,
      ease:'power3.out'
    })
  }

  function handleCloseTaskCreation(){
    tl.current.pause()
    tl.current.reverse()
  }

  function handleAddTask(){
    tl.current.pause()
    tl.current.reverse()
    dispatch(setMessage('New task added!!'))
  }

  return (

    <div className="relative  page-wrapper bg-bbg  h-screen overflow-hidden w-full md:bg-cbg flex justify-center items-center select-none">
      <Menu/>
      <div
        // w-tc h-3/4 rounded-2xl (for large screens)
        // h-screen w-screen rounded-none (for mobile devices)
        className=" tasksScreen bg-bbg shadow-2xl pt-6 px-8 pb-10 flex flex-col h-full w-screen
                        md:w-tc md:h-4/5 md:rounded-2xl md:absolute overflow-hidden  "
      >
        <Navbar />
        <Header />
        <Tasks />

        <div className="add-task-btn absolute right-8 z-20 bottom-10 bg-purple-700 
                  aspect-square w-12 font-light flex justify-center shadow-2xl
                  items-center text-3xl rounded-full hover:cursor-pointer"
            onClick={handleTaskCreation}          
        >
          +
        </div>
        <div className="create-task-view dis "> 
          <CreateTask 
            closeTaskCreation={handleCloseTaskCreation} 
            handleAddTask={handleAddTask}
          /> 
        </div>
      </div>
    </div> 
  );
};

export default TaskView;
