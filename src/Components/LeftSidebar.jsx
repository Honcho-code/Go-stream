import React from "react";
import {
  Bell,
  Bookmark,
  Heart,
  Home,
  Library,
  ListCollapse,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const LeftSidebar = ({ fullCenterDisplay, setFullCenterDisplay }) => {
  const baseClass = `flex gap-3 text-white items-center py-3 px-3 rounded-lg lg:px-4 lg:py-3  transition-all duration-300 cursor-pointer ${
    fullCenterDisplay ? "" : "mx-auto"
  }`;
  const activeClass = "bg-zinc-900 font-semibold";
  return (
    <div
      className={`hidden md:block  w-full bg-zinc-800 px-4 py-2 h-screen  sticky top-0 bottom-0 ${
        fullCenterDisplay ? "md:col-span-2 lg:col-span-3" : "col-span-1"
      }`}
    >
      <div
        className={`flex gap-2 justify-between items-center ${
          fullCenterDisplay ? "flex-row" : "flex-col gap-5"
        }`}
      >
        <img
          src={`${fullCenterDisplay ? "/full-logo1.png" : "/Logo1.png"}`}
          alt=""
          className={`block  ${
            fullCenterDisplay ? "md:w-35 lg:w-40" : "w-10 mx-auto"
          }`}
        />
        <ListCollapse
          className=" cursor-pointer"
          onClick={() => setFullCenterDisplay(!fullCenterDisplay)}
        />
      </div>
      <div className="flex-col flex gap-5 mt-8 mx-auto">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : `${baseClass}`
          }
        >
          <Home className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>Home</p>
        </NavLink>
        <NavLink
          to={"/library"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : `${baseClass}`
          }
        >
          <Library className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>
            Your Library
          </p>
        </NavLink>
        <NavLink
          to={"/music"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : `${baseClass}`
          }
        >
          <User className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>Profile</p>
        </NavLink>
        <NavLink
          to={"/favorites"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : `${baseClass}`
          }
        >
          <Heart className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>Profile</p>
        </NavLink>
        <NavLink
          to={"/create"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass}` : `${baseClass}`
          }
        >
          <Plus className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>Create Playlist</p>
        </NavLink>
      </div>
      <div className="mt-10 flex-col flex gap-5">
        <div className="flex gap-2 items-center">
          <img src="/Logo1.png" alt="" className={`block  ${
            fullCenterDisplay ? "md:w-12 lg:w-12" : "w-12 mx-auto"}`}/>
            <div className={`${fullCenterDisplay ? "block" : "hidden"}`}>
            <p >Rap Battle</p>
            <p className="text-xs w-full text-zinc-400">Album - DRAKE</p>
            </div>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/Logo1.png" alt="" className={`block  ${
            fullCenterDisplay ? "md:w-12 lg:w-12" : "w-12 mx-auto"}`}/>
            <div className={`${fullCenterDisplay ? "block" : "hidden"}`}>
            <p >Rap Battle</p>
            <p className="text-xs w-full text-zinc-400">Album - DRAKE</p>
            </div>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/Logo1.png" alt="" className={`block  ${
            fullCenterDisplay ? "md:w-12 lg:w-12" : "w-12 mx-auto"}`}/>
            <div className={`${fullCenterDisplay ? "block" : "hidden"}`}>
            <p >Rap Battle</p>
            <p className="text-xs w-full text-zinc-400">Album - DRAKE</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
