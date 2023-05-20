import React from "react";
import profile from '../images/cyberpunk-profile.jpeg'
import graph from '../images/cyberpunk-graph.webp'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';


const Menu = () => {

  return (
    <div className="menu-container opacity-0  bg-dbbg absolute top-0 right-0 overflow-hidden 
            md:relative md:w-tc md:h-4/5 md:rounded-2xl md:opacity-100">
      <div
        className=" profile flex w-2/3 h-screen 
                     p-12 pr-4  md:h-full "
      >
        <div className="h-full w-full flex flex-col justify-center items-start scale-100 menu-components-container">
          <div className="profile menu-card">
            <div
              className="profile-pic w-24 my-9 
                rounded-full aspect-square p-1"
            >
              {/* Paste profile image */}
              <img className=" rounded-full" src={profile} alt="" />
            </div>
            <div className="name text-3xl font-mono font-bold tracking-widest">
              <h1>Anonymous Visitor </h1>
            </div>
          </div>
          <div className="menu-list  menu-card opacity-70 flex flex-col gap-1 my-7">
            <div className="menu-item">
                <div className="menu-item-icon">
                  <BookmarksOutlinedIcon />
                </div>
                Templates
            </div>
            <div className="menu-item">
                <div className="menu-item-icon">
                  <CategoryOutlinedIcon/>
                </div>
                Categories
            </div>
            <div className="menu-item">
                <div className="menu-item-icon">
                  <AutoGraphOutlinedIcon/>
                </div>
                Analytics
            </div>
          </div>
          <div className="graph  menu-card w-full pr-10">
            <div className="h-20 w-full rounded-lg overflow-hidden">
                <img 
                    className=" object-cover rounded-lg -ml-2 "
                    src={graph} alt="" 
                />
            </div>
            <h2 className="opacity-80 font-mono font-semibold tracking-widest ">
                Consistancy
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
