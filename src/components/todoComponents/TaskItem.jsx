import React, { useEffect, useRef, useState } from "react";
import "./styles/checkbox.css";
import useDoubleClick from "use-double-click";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import {
  removeTask,
  toggleTaskComplete,
} from "../../features/taskList/taskListSlice";
import { setMessage } from "../../features/message/messageSlice";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

// task items details gets passed in as props :
const TaskItem = ({ title, description, since, id }) => {
  
  // to edit the task (delete or change if task is completed)
  let dispatch = useDispatch();

  // to expand the description of the task based on user click
  let [expanded, setExpanded] = useState(false);
  let [taskCompleted, setTaskCompleted] = useState(false);

  const buttonRef = useRef();

  // this is imported from 'useDoubleClick' to handle double click and single click
  // if there is only a single click, then the  expanded state toggles with animation
  // if double click it changes task completed state
  useDoubleClick({
    onSingleClick: (e) => {
      handleSingleClick();
    },
    onDoubleClick: (e) => {
      setTaskCompleted(!taskCompleted);
    },
    ref: buttonRef,
    latency: 220,
  });

  // this useeffect is used to animate and task completion animation based on state
  useEffect(() => {
    if (taskCompleted) {
      gsap.to(`.strike-title-${id}`, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        x: 0,
      });
      gsap.to(`.task-item-${id}`, {
        backgroundColor: "rgba(100, 12, 118, 0.571)",
      });
      if (expanded) {
        handleSingleClick();
      }
      dispatch(setMessage('Bravo! Mission Done..'))
    } else {
      gsap.to(`.strike-title-${id}`, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        x: "-200%",
      });
      gsap.to(`.task-item-${id}`, {
        backgroundColor: "#0C134F",
      });
    }
  }, [taskCompleted]);

  // this is used to animate close expanded task with animation
  useEffect(() => {
    if (expanded) {
      gsap.to(`.expand-task-${id}`, {
        height: "auto",
        duration: 0.5,
        opacity: 1,
        ease: "power3.inOut",
        onComplete:()=>{ScrollTrigger.refresh();},
      });
    }
  }, [expanded]);

  // used for scroll animation
  useEffect(()=>{
    let scrollCtx=gsap.context(()=>{
      gsap.to(`.task-item-${id}`, {
        y:-100,
        opacity:0,
        ease:'back.in(0.7)',
        scrollTrigger: {
          trigger: `.task-item-${id}`,
          scroller:'.task-item-container',
          toggleActions: 'restart pause reverse pause',
          start: 'top top',
          endTrigger: `.task-item-${id}`,
          end: 'bottom top',
          scrub: 1.5,
        }
      });

    })
    return ()=>{scrollCtx.revert();}
  },[])

  function handleSingleClick() {
    if (expanded) {
      gsap.to(`.expand-task-${id}`, {
        height: "0",
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          setExpanded(false);
          // refreshes the whole scrolltrigger position because the height of task item changes dynamically
          ScrollTrigger.refresh()
        },
      });
    } else {
      setExpanded(true);
    }
  }

  // deleting the task if delete button is clicked
  function handleTaskDelete(e, id) {
    e.preventDefault();
      gsap.to(`.task-item-${id}`, {
      height: 0,
      opacity:0,
      margin: 0,
      padding: 0,
      ease: "power3.easeOut",
      duration: 0.5,
      onComplete: () => {
        //deleting the element from DOM and redux state
        document.getElementsByClassName(`task-item-${id}`)[0].styledisplay =
          "none";
        dispatch(removeTask(id));
      },
    });
    gsap.to(`.task-item-${id} .checkbox-container`,{
      opacity:0,
      duration: 0.5,
    });
  }
  
  // react element => task expanded
  const Expand = () => {
    return (
      <div
        className={`expand-task-${id} expand-task overflow-hidden h-0 opacity-0`}
      >
        <p className="text-description mb-1 font-thin text-sm leading-4 pt-2 pl-6 pr-2">
          {description}
        </p>
        <div className=" ml-5 mr-2 mb-1 task-edit-div flex justify-between gap-2">
          <a href="none" className="btn dit-btn flex-1">
            EDIT
          </a>
          <a
            href=" "
            className="btn delete-btn flex-1"
            onClick={(e) => {
              handleTaskDelete(e, id);
            }}
          >
            DELETE
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={buttonRef}
      className={` task-item-${id} task-item item-container relative select-none `}
    >
      <div className="flex items-center gap-2 ">
        <div className="checkbox-container z-20">
          <input
            type="checkbox"
            className="checkbox-input"
            id={`checkbox-for-${id}`}
            checked={taskCompleted}
            onChange={() => {
              setTaskCompleted(!taskCompleted);
              dispatch(toggleTaskComplete(id));
            }}
            style={{ display: "none" }}
          />
          {/* Pass in an id property other than the 'title */}
          <label htmlFor={`checkbox-for-${id}`} className="check">
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 18 18"
              className="border-sky-500"
            >
              <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
              <polyline points="1 9 7 14 15 4"></polyline>
            </svg>
          </label>
        </div>
        <div className=" task-title item-header flex relative justify-center items-center ">
          <div className={`strike-title-${id} strike-title`}></div>
          <div className=" opacity-4">{title}</div>
        </div>
        <div className="time-since text-xxs opacity-50 font-light absolute top-1 right-3">
          {since} ago
        </div>
      </div>
      {expanded ? <Expand /> : ""}
    </div>
  );
};

export default TaskItem;
