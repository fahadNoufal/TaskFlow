import React, { useEffect, useRef, useState } from "react";
import './styles/checkbox.css';
import useDoubleClick from 'use-double-click';
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { removeTask, toggleTaskComplete } from "../../features/taskList/taskListSlice";


const TaskItem = ({ title, description, since, id }) => {

  let dispatch=useDispatch()

  let [expanded,setExpanded]=useState(false)
  let [taskCompleted,setTaskCompleted]=useState(false)

  const buttonRef = useRef();

  useDoubleClick({
    onSingleClick: e => {handleSingleClick()},
    onDoubleClick: e => {setTaskCompleted(!taskCompleted)},
    ref: buttonRef,
    latency: 220
  });

  useEffect(()=>{
    if (taskCompleted){
      gsap.to(`.strike-title-${id}`,{
        opacity:1,
        duration:0.5,
        ease: "power3.out",
        x:0
      })
      gsap.to(`.task-item-${id}`,{
        backgroundColor:'rgba(100, 12, 118, 0.571)'
      })
      if (expanded) {
        handleSingleClick()
      }
    }else{
      gsap.to(`.strike-title-${id}`,{
        opacity:0,
        duration:0.5,
        ease: "power3.out",
        x:'-200%'
      })
      gsap.to(`.task-item-${id}`,{
        backgroundColor:'#0C134F',
      })
    }
  },[taskCompleted])

  useEffect(()=>{

    if (expanded){
      gsap.fromTo(`.expand-task-${id}`, {
        height: '0',
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      }, { 
        height: 'auto',
        duration: 0.6,
        opacity: 1,
        ease: 'power3.inOut'
      })
    }
  },[expanded])

  function handleSingleClick(){
    if (expanded){
      gsap.to(`.expand-task-${id}`, {
        height: '0',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.Out',
        onComplete: ()=>{
          setExpanded(false)
        }
      })
    }else{
      setExpanded(true);   
    }
  }

  function handleTaskDelete(e,id){
    e.preventDefault();
    gsap.to(`.task-item-${id}`,{
      height:0,
      margin:0,
      padding:0,
      ease:'power3.easeOut',
      duration:0.5,
      onComplete:()=>{
        document.getElementsByClassName(`task-item-${id}`)[0].style.display='none'
        dispatch(removeTask(id))
            }
    })
    
    
  }

  const Expand=()=>{
    return(
        <div className={`expand-task-${id} expand-task overflow-hidden`} >
          <p className="task-description text-description font-thin leading-3 pt-2 pl-6 pr-2">
            {description}
          </p>
          <div className=" ml-5 mr-2 mb-1 task-edit-div flex justify-between gap-2">
            <a href="none" className="btn dit-btn flex-1">
              EDIT
            </a>
            <a href=" " className="btn delete-btn flex-1" onClick={e=>{handleTaskDelete(e,id)}} >
              DELETE
            </a>
          </div>
        </div>
    )
  }

  return (
    <div ref={buttonRef} className={` task-item-${id} task-item item-container relative select-none `} >
      <div className="flex items-center gap-2 ">
        <div className="checkbox-container z-20">
            <input 
              type="checkbox" 
              className="checkbox-input" 
              id={`checkbox-for-${id}`} 
              checked={taskCompleted} 
              onChange={()=>{setTaskCompleted(!taskCompleted);dispatch(toggleTaskComplete(id))}}
              style={{display:'none'}}/>
            {/* Pass in an id property other than the 'title */}
            <label htmlFor={`checkbox-for-${id}`} className="check">
                <svg width="18px" height="18px" viewBox="0 0 18 18" className="border-sky-500" >
                    <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
        </div>
        <div 
          className=" task-title item-header flex relative justify-center items-center "
        >
          <div className={`strike-title-${id} strike-title`}></div>
          <div className=" opacity-4">{title}</div>
        </div>
        <div className="time-since text-xxs opacity-50 font-light absolute top-1 right-3">
          {since} ago
        </div>
      </div>
      {expanded?<Expand/>:''}
    </div>
  );
};

export default TaskItem;

