import React, { useEffect, useState } from "react";
import { ChevronLeft, Menu, Search, X } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ search, setSearch, handleSearchMovie, setSearchResult }) => {
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const isHome = location.pathname === "/";
  const isMovieDetail = location.pathname.startsWith("/movie/");
  const navigate = useNavigate()
  
  const isAuthenticated = auth?.currentUser

  
  useEffect(() => {
    if (!openNav) return;
    const handleScroll = () => {
      setOpenNav(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openNav]);
  useEffect(() => {
    if (!searchBar) return;
    const handleScroll = () => {
      setSearchBar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchBar]);

  return (
    <div className="sticky z-50 top-0 flex justify-between items-center m-0 px-4 md:px-10 lg:px-16 py-4 bg-zinc-50/5 ring-inset ring-1 ring-zinc-50/10 backdrop-blur-2xl">
      {searchBar && (
        <div className="absolute top-15  block  right-0 w-full px-3 py-5 md:hidden text-center backdrop-blur-4xl">
          <form className="flex gap-3 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies"
              className="outline-none w-80 lg:w-100 h-10 bg-zinc-900 rounded-full px-5 "
            />
            <button
              className="bg-blue-800 px-6 h-10 rounded-full cursor-pointer"
              onClick={handleSearchMovie}
            >
              Search
            </button>
          </form>
        </div>
      )}
      <div>
        {isMovieDetail ? (
          <div className="w-8 h-8 md:w-10 md:h-10 grid place-items-center bg-zinc-50/10 md:rounded-lg ring-inset ring-1 ring-zinc-50/[0.02] rounded-sm backdrop-blur-2xl hover:bg-zinc-50/15 transition-[transform,background-color] active:scale-95 cursor-pointer" onClick={()=>navigate(-1)}>
          <ChevronLeft className="size-5"/>
        </div>
        ) : (<h1 className="text-2xl lg:text-3xl font-extrabold text-blue-800 cursor-pointer" onClick={()=>navigate("/")}>
          MovieBing
        </h1>)}
      </div>
      <div className="flex items-center gap-5 ">
        {isHome && (
          <form className="hidden md:flex gap-3 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies"
              className="outline-none w-80 lg:w-100 h-10 bg-zinc-900 rounded-full px-5"
            />
            <button
              className="bg-blue-800 px-6 h-10 rounded-full cursor-pointer"
              onClick={handleSearchMovie}
            >
              Search
            </button>
          </form>
        )}
        {isHome && (
          <div className="w-8 h-8 md:w-10 md:h-10 grid place-items-center bg-zinc-50/10 md:rounded-lg ring-inset ring-1 ring-zinc-50/[0.02] rounded-sm backdrop-blur-2xl hover:bg-zinc-50/15 transition-[transform,background-color] active:scale-95 cursor-pointer md:hidden" onClick={()=>setSearchBar(!searchBar)}>
          {searchBar ? <X className="size-5" /> : <Search className="size-5" />}
        </div>
        )}
        <div className="menu-btn" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <X className="size-5" /> : <Menu className="size-5" />}
          {openNav && (
            <div className="absolute top-12 md:top-14  right-0 w-40 px-3 py-5 md:w-50  bg-zinc-900/80 rounded-xl ring-inset ring-1 ring-zinc-50/5 grid grid-rows-3 gap-4 text-center backdrop-blur-4xl">
              <Link
                to={"/"}
                onClick={() => setOpenNav(!openNav)}
                className="hover:bg-zinc-200 hover:text-zinc-900 py-0 md:py-2 rounded"
              >
                Home
              </Link>
              <Link
                to={"/about"}
                onClick={() => setOpenNav(!openNav)}
                className="hover:bg-zinc-200 hover:text-zinc-900 py-0 md:py-2 rounded"
              >
                About
              </Link>
              <Link
                to={"/profile"}
                onClick={() => setOpenNav(!openNav)}
                className={`hover:bg-zinc-200 hover:text-zinc-900 py-0 md:py-2 flex gap-2 items-center justify-center rounded ${isAuthenticated ? "flex" : "hidden"}`}
              >
                <FontAwesomeIcon icon={faUser} className=""/>
                <p>My Profile</p>
              </Link>
  
              <Link
                className={`w-full bg-blue-800 py-2 rounded ${isAuthenticated ? "hidden" : "block"}`}
                to={"/login"}
                onClick={() => setOpenNav(!openNav)}
              >
                Login
              </Link>
              <Link
                className={`w-full bg-red-800 py-2 rounded ${isAuthenticated ? "hidden" : "block"}`}
                to={"/signup"}
                onClick={() => setOpenNav(!openNav)}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
