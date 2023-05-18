import React, { useEffect, useRef } from 'react'
import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector,useDispatch } from 'react-redux';
import { toggleMenu } from '../../features/showMenu/showMenuSlice';
import './styles/menu-icon.css';
import { gsap } from 'gsap';

const Navbar = () => {

  let tl=useRef()
  const dispatch = useDispatch();
  const showMenu=useSelector((state)=>(state.isMenuDisplayed.displayed));
  useEffect(()=>{
    let ctx=gsap.context(()=>{
      tl.current = gsap.timeline({paused:true});
      tl.current.to('.tasksScreen',{
        duration:0.7,
        scale: 0.84,
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


  return (
    <nav className=' flex items-center justify-between h-10 text-icon'>
        <div className=" opacity-70 nav-menu-icon ">
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
        <div className="flex gap-4  ">
            <ContentPasteSearchSharpIcon />
            <NotificationsActiveIcon/>
        </div>
    </nav>
  )
}

export default Navbar
