import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRightIcon,
  Heart,
  Home,
  Library,
  Menu,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";

const Navber = () => {
  const [menuBar, setMenuBar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    } catch (error) {
      console.error("error signing in", error);
    }
  };

  const isAuthenticated = auth?.currentUser;

  const isHome = location.pathname === "/";
  return (
    <div>
      <div className="w-full py-4 md:py-2 px-4 rounded-2xl">
        <div className="md:flex justify-between items-center hidden">
          <div className="md:flex gap-2">
            <div className="menu-btn" onClick={() => navigate(-1)}>
              <ChevronLeft />
            </div>
            <div className="menu-btn" onClick={() => navigate(+1)}>
              <ChevronRight />
            </div>
          </div>
          {isHome && (
            <div className="md:flex gap-2 place-items-center bg-zinc-50/10 md:rounded-lg ring-inset ring-1 ring-zinc-50/[0.02] rounded-sm backdrop-blur-2xl hover:bg-zinc-50/15 transition-[transform,background-color] cursor-pointer h-8 md:h-10 px-3 w-sm">
              <Search className="text-zinc-400" />
              <input
                type="text"
                placeholder="What do you want to stream"
                className="w-full outline-none"
              />
            </div>
          )}
          {isAuthenticated ? (
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <img src={auth?.currentUser.photoURL} alt="" />
            </div>
          ) : (
            <button className="btn" onClick={handleSignin}>
              Sign in
            </button>
          )}
        </div>

        <div className="flex justify-between items-center md:hidden">
          {isHome ? (
            <img src="/full-logo1.png" alt="" className="w-30" />
          ) : (
            <div className="flex gap-4">
              <div className="menu-btn" onClick={() => navigate(-1)}>
                <ChevronLeft />
              </div>
            </div>
          )}
          <div className="menu-btn" onClick={() => setMenuBar(!menuBar)}>
            <Menu />
          </div>
        </div>
      </div>
      {menuBar && (
        <div className="absolute top-0 z-50 h-screen w-[100%] bg-zinc-900/50">
          <div className="w-[60%] bg-zinc-800 h-screen z-50 px-4 py-4">
            <div className="flex justify-between items-center md:hidden">
              <img src="/full-logo1.png" alt="" className="w-30" />
              <div className="menu-btn" onClick={() => setMenuBar(!menuBar)}>
                <X />
              </div>
            </div>
            <div className="flex flex-col gap-7 mt-10">
              <NavLink to={"/"} className="flex gap-3 items-center">
                <Home className="size-6" />
                <p className="text-lg">Home</p>
              </NavLink>
              <NavLink to={"/library"} className="flex gap-3 items-center">
                <Library className="size-6" />
                <p className="text-lg">Library</p>
              </NavLink>
              <NavLink to={"/music"} className="flex gap-3 items-center">
                <User className="size-6" />
                <p className="text-lg">Profile</p>
              </NavLink>
              <NavLink to={"/music"} className="flex gap-3 items-center">
                <Heart className="size-6" />
                <p className="text-lg">Favorites</p>
              </NavLink>
              <div className="flex gap-3 items-center">
                <Plus className="size-6" />
                <p className="text-lg">Create Playlist</p>
              </div>
            </div>
            <div className="absolute bottom-10 w-[60%]">
              {isAuthenticated ? (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                    <img src={auth?.currentUser.photoURL} alt="" />
                  </div>
                  <div>
                    <p className="text-lg">{auth?.currentUser.displayName}</p>
                    <p className="text-xs">{auth?.currentUser.email}</p>
                  </div>
                </div>
              ) : (
                <button className="btn " onClick={handleSignin}>
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navber;
