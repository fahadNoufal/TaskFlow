import TaskItem from "./TaskItem";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useSelector } from "react-redux";

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(ScrollTrigger);


const Tasks = () => {

  let darkMode=useSelector((state)=>state.darkMode.darkMode)
  
  let taskData = useSelector((state)=>(state.taskList.data))
  const completedTasks=taskData.filter((item)=>(item.completed)).length
  const totalTask=taskData.length
  const progress= Math.round(completedTasks/totalTask*100)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".task-item"], {
        duration: 1,
        opacity: 0,
        scale: 0.5,
        y: "100px",
        stagger: {
          amount: 0.2,
        },
        ease: "back.out(0.3)",
        onComplete:()=>{ScrollTrigger.refresh()}
      });
      gsap.to('.progress',{
        x:`-${100-progress}%`,
        duration:2,
        ease: "back.out"
      })
    });

    return () => ctx.revert();
  },[]);

  useEffect(()=>{
      
    gsap.to('.progress',{
      x:`-${100-progress}%`,
      duration:2,
      ease: "back.out"
    })
  },[taskData])


  const TaskItems = taskData.map((taskDetails) => (
    <TaskItem
      key={taskDetails.id}
      id={taskDetails.id}
      since={taskDetails.since}
      title={taskDetails.title}
      completed={taskDetails.completed}
      description={taskDetails.description}
    />
  ));

  return (
    <div className="flex flex-col overflow-auto overflow-x-hidden  "  >
      <h3 className=" opacity-60 ttt text-xs font-bold mt-3 mb-2">
        TODAYS TASKS
      </h3>
      <div className=" task-item-container flex-grow overflow-x-hidden overflow-auto tasks-container" >
        <div className="task-list">{TaskItems}</div>
      </div>
    </div>
  );
};

export default Tasks;
