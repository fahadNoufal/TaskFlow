import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../features/message/messageSlice";

gsap.registerPlugin(TextPlugin)
const words=[' Focus..','Finish..','Conquer!'] //'Lets finish some task'


const Header = () => {
  let message =useSelector((state)=>(state.message.message))
  let dispatch=useDispatch()

  const msgTl = useRef();
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headTl = gsap.timeline();
      headTl.to('.head-cursor',{
        opacity:1,
        ease:'power3.easeOut',
        duration:0.2,
        repeat:-1,
        yoyo:true,
      })

      const welcomeTl=gsap.timeline()
      const wordTl=gsap.timeline()

      let welcomeMessage="What's up, Warrior!"
      let tl=gsap.timeline({yoyo:true,repeat:1,repeatDelay:1})
      tl.to('.head-text',{
        duration:1,
        text: welcomeMessage,
      })
      welcomeTl.add(tl)
      headTl.add(welcomeTl)
      headTl.from('.slide-title',{
        marginLeft:'-200',
        duration:0.8,
        ease: 'power3.inOut'
      })
      headTl.from('.slide-title',{
        y:'100%',
        duration:0.8,
        ease: 'power3.out'
      })

      words.forEach((word) =>{
        let tl=gsap.timeline()
        if (word==='Conquer!'){
          tl.to('.head-text',{
            delay:0.3,
            duration:1.1,
            text:word,
          })
        }else{
          tl.to('.head-text',{
            delay:0.5,
            duration:1.1,
            text:word,
            repeat:1,
            repeatDelay:1,
            yoyo:true,
          })
        }
        wordTl.add(tl)
      })

      headTl.add(wordTl)

      headTl.to('.head-cursor',{
        y:20,
        opacity:0,
        display: 'none',
        ease:'power3.easeOut',
        duration:0.3,
        onComplete:()=>{
          headTl.kill((element) => element.classList.contains('head-cursor'));
        }
      })
      
    });
    return () => {
          ctx.revert();
        };
  }, []);

  useEffect(() => {

    // this useeffect is called everytime the message (redux) is changed, which triggert the animation
    // also it sets the message back to '' , which do not trigger this animation
    // also this wont run in the first load as initial value of the message is '' ,so that it wont
    // mess with the welcome animation
    
    if (message!==''){
      const cxt = gsap.context(() => {
        msgTl.current = gsap.timeline();
        gsap.to('.notification-icon',{
          color:'#97ba5e',
          duration:1.3,
          yoyo:true,
          repeat:5,
          onComplete:()=>{gsap.to('.notification-icon',{color:'white' })}
        });
        msgTl.current.to(".welcome-msg", {
          x: "-200%",
          delay:0.3,
          duration: 0.8,
          opacity: 0,
          ease: "power3.inOut",
        },'<');
        msgTl.current.to('.message-txt',{
          duration:0.5,
          x:0,
        })
        let msgTl2 = gsap.timeline({});
        msgTl.current.to(".message-txt", {
          duration: 1,
          text:message,  
          delay:0.1,
        });
        msgTl.current.add(msgTl2);
        msgTl.current.to('.message-txt',{
          duration:0.3,
          repeat:1,
          yoyo:true,
          repeatDelay:0.2,
          onComplete:()=>{
            msgTl.current.reverse()
            msgTl.current.eventCallback("onReverseComplete", function () {
              // This function will execute after the timeline's reverse animation completes
              gsap.to(".welcome-msg", {
                x: "0",
                delay:0.3,
                duration: 0.8,
                opacity: 1,
                ease: "power3.inOut",
              });
            });
            dispatch(setMessage(''))
          }
        })
    })
   }
  },[message])


  

  return (
    <div>
      <div className="title relative ">
        <div className=" welcome-msg text-2xl font-extrabold py-3 tracking-wider flex items-baseline ">
          <div className="head-title-container relative z-20 overflow-hidden ">
            <span className="slide-title z-20 inline-block mr-2 ">Let's </span>
          </div>
          <span className="head-text"> </span>
          <span className="head-cursor opacity-0 h-2 w-4 bg-white">  </span>
        </div>
        <div className="message-txt absolute bottom-3 text-2xl font-extrabold opacity-1 -translate-x-40 ">
          
        </div>
      </div>
      <div className="widgets">
        <div className="task-stats-header">
          <h3 className=" opacity-60 text-xs font-bold">ACTIVITIES</h3>
        </div>
        <div className="task-stats font-extrabold relative bg-dbbg rounded-2xl py-2 px-4 my-2 -mx-1 ">
          <h5 className=" text-xs font-medium opacity-50">Task Stats </h5>
          <h4 className="item-header">
            Total Completed Tasks : 
          </h4>
          <div className="progress-bar h-2 mt-3 mb-5  flex w-full justify-start ">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
