import React, { useEffect, useRef } from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector,useDispatch } from 'react-redux';
import { toggleMenu } from '../../features/showMenu/showMenuSlice';
import './styles/menu-icon.css';
import { gsap } from 'gsap';
import { toggleDarkMode } from '../../features/darkMode/darkModeSlice';

const Navbar = () => {

  let tl=useRef()
  const dispatch = useDispatch();
  const showMenu=useSelector((state)=>(state.isMenuDisplayed.displayed));

  const darkMode = useSelector((state)=>(state.darkMode.darkMode))
  
  useEffect(()=>{
    const viewportWidth = window.innerWidth;
    
    let ctx=gsap.context(()=>{
      tl.current = gsap.timeline({paused:true});
      tl.current.to('.tasksScreen',{
        duration:0.7,
        scale: `${(viewportWidth<768)?'1':'0.85'}`,
        y:`${(viewportWidth<768)?'50px':'0'}`,
        x: "65%",
        borderRadius: "2.7rem",
        ease: "back.out",
        opacity: 1,
        boxShadow:'5px 15px 25px rgba(0,0,0,0.3)'
      })
      tl.current.to(".menu-card", {
        x: 0,
        duration:0.7,
        stagger:0.1,
        ease: "back.out", 
      },"<");
      tl.current.fromTo(".menu-container", {
        ease: "back.out",
        duration:0.7,
      },{opacity:1,scale:1},"<");
    })
    return ()=>{
      ctx.revert()
    }
  },[])

  useEffect(()=>{
    showMenu?tl.current.play():tl.current.reverse()
  },[showMenu])

  // code for Dark mode animation

  let darkTl = useRef(null);

  useEffect(()=>{
    let Nctx=gsap.context(()=>{
      darkTl.current = gsap.timeline({paused: true});
      darkTl.current.to(".page-wrapper", {
        background: "linear-gradient(#FFFBC1,#DBA39A)",
        color: "black",
        // duration:1,
      });
      darkTl.current.to(
        "#task-screen",
        {
          background: "linear-gradient(#F7CCAC,#56b4bb)",
          // duration:1,
        },
        "<"
      );
      darkTl.current.to(
        ".menu-container",
        {
          background: " linear-gradient(to right, #46C2CB,#F7CCAC)",
          // duration:1,
        },
        "<"
      )
      darkTl.current.to(
        ".nav-icon-container",
        {
          color: "#FFFFFF",
        },
        "<"
      )
      darkTl.current.to(
        ".task-stats",
        {
          backgroundColor: "transparent",
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.19)",
        },
        "<"
      )
      darkTl.current.to(
        [".item-container",'.task-item'],
        {
          backgroundColor: " #E6DDC4",
        },
        "<"
      )
      darkTl.current.to(
        ".add-task-btn",
        {
          backgroundColor: "#C780FA",
          color: "#FFFFFF",
        },
        "<"
      )
      darkTl.current.to(".btn", 
      {
        backgroundColor:'#C780FA'
      },
      '<')
      darkTl.current.to(".text-description", 
      {
        fontWeight:'300',
      },
      '<')
    })
    return ()=>{
      Nctx.revert()
    }
  },[])

  useEffect(()=>{
    darkMode?darkTl.current.reverse():darkTl.current.play()
  },[darkMode])

  return (
    <nav className=' flex items-center justify-between h-10 text-white'>
        <div className=" opacity-70 nav-menu-icon nav-icon-container">
            <input 
              type="checkbox" 
              id="menu-icon" 
              onClick={(el)=>{dispatch(toggleMenu());}}
            />
            <label htmlFor="menu-icon" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
            </label>
        </div>
        <div className="flex gap-4 nav-icon-container items-center" >
            
            <div className="dark-light-toggle-container">
              <input type="checkbox" className="dn" id="dn" checked={darkMode} onChange={(el)=>{dispatch(toggleDarkMode())}} />
              <label htmlFor="dn" className="toggle-dn">
                  <span className="toggle__handler">
                      <span className="crater crater--1"></span>
                      <span className="crater crater--2"></span>
                      <span className="crater crater--3"></span>
                  </span>
                  <span className="star star--1"></span>
                  <span className="star star--2"></span>
                  <span className="star star--3"></span>
                  <span className="star star--4"></span>
                  <span className="star star--5"></span>
                  <span className="star star--6"></span>
              </label>
            </div>
            <div className="notification-icon scale-110">
              <NotificationsActiveIcon/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
