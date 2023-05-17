import { gsap } from "gsap";
import React from "react";

const Message = ({ message }) => {
  const cxt = gsap.context(() => {
    const msgTl = gsap.timeline();
    msgTl.to(".welcome-msg", {
      x: "-200%",
      duration: 0.8,
      opacity: 0,
      ease: "power3.inOut",
    });

    let msgTl2 = gsap.timeline({ yoyo: true, repeat: 1, repeatDelay: 1 });
    msgTl.to(".message-txt", {
      duration: 1,
      text:message,
    });
    msgTl.add(msgTl2);
    msgTl.to(".welcome-msg", {
      duration: 0.8,
      x: 0,
      opacity: 1,
    });
  });
  return <div></div>;
};

export default Message;
