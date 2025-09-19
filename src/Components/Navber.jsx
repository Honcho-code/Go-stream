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
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import Spinner from "./Spinner";
import { PlayerContext, usePlayer } from "../context/PlayerContext";

const Navber = () => {
  const [menuBar, setMenuBar] = useState(false);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchedMusic, setSearchMusic] = useState();
  const BASE_URL = "https://go-stream-livid.vercel.app/api/deezer";
  const { playTrack } = useContext(PlayerContext);
  const user = auth?.currentUser
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
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  
  useEffect(() => {
    if (!search.trim()) {
      setSearchMusic([]);
      return;
    }
    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}?endpoint=search?q=${search}`);
        const data = await res.json();
        setSearchMusic(data.data || []);
        console.log(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

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
            <div className="relative">
              <div className="md:flex gap-2 place-items-center bg-zinc-50/10 md:rounded-lg ring-inset ring-1 ring-zinc-50/[0.02] rounded-sm backdrop-blur-2xl hover:bg-zinc-50/15 transition-[transform,background-color] cursor-pointer h-8 md:h-10 px-3 w-sm">
                <form className="flex items-center gap-2 w-full">
                  <Search className="text-zinc-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search songs, albums, playlist, artist..."
                    className="w-full outline-none"
                  />
                </form>
                <div
                  onClick={() => setSearch("")}
                  className={`${search.length > 0 ? "block" : "hidden"}`}
                >
                  <X className="text-zinc-300" />
                </div>
              </div>
              {search && (
                <div className="absolute bg-zinc-950/40 w-full h-80 z-50 rounded-b-2xl backdrop-blur-3xl overflow-y-auto scrollbar-hide scrollbar-track-transparent px-4 py-4">
                  {loading ? (
                    <Spinner />
                  ) : searchedMusic.length > 0 ? (
                    searchedMusic.map((music) => (
                      <div
                        key={music.id}
                        className="mb-2 cursor-pointer"
                        onClick={() => playTrack(music, searchedMusic)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={music?.album?.cover_small}
                            alt={music?.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {music?.title}
                            </p>
                            <p className="text-xs text-zinc-400">
                              {music?.artist?.name} •{" "}
                              {formatDuration(music?.duration)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No results found.</p>
                  )}
                </div>
              )}
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
          <div className="flex gap-4">
            <div className="menu-btn" onClick={() => navigate("/search")}>
              <Search />
            </div>
            <div className="menu-btn" onClick={() => setMenuBar(!menuBar)}>
              <Menu />
            </div>
          </div>
        </div>
      </div>
      {menuBar && (
        <div className="absolute top-0 z-50 h-screen w-[100%] bg-zinc-900/50">
          <div className="w-[60%] bg-zinc-900 h-screen z-50 px-4 py-4">
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
              <NavLink to={"/favorite"} className={`flex gap-3 items-center ${!user ? "hidden" : "block"}`}>
                <Heart className="size-6" />
                <p className="text-lg">Favorites</p>
              </NavLink>
              <NavLink to={"/profile"} className={`flex gap-3 items-center ${!user ? "hidden" : "block"}`}>
                <User className="size-6" />
                <p className="text-lg">Profile</p>
              </NavLink>
            </div>
            <div className="absolute bottom-30 w-[60%]">
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
                <button className="bg-zinc-800 ring-1 px-4 py-2 rounded-lg " onClick={handleSignin}>
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
