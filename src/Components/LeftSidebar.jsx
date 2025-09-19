import React, { useEffect, useState } from "react";
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
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const LeftSidebar = ({ fullCenterDisplay, setFullCenterDisplay }) => {
  const navigate = useNavigate();
    const user = auth?.currentUser;
  const baseClass = `flex gap-3 text-white items-center py-3 px-3 rounded-lg lg:px-4 lg:py-3  transition-all duration-300 cursor-pointer ${
    fullCenterDisplay ? "" : "mx-auto"
  }`;
  const [favoriteAlbum, setFavoriteAlbum] = useState([]);
  const activeClass = "bg-zinc-900 font-semibold";

  useEffect(() => {
    const user = auth?.currentUser;
    if (!user) return;

    const favRef = collection(db, "favorite", user.uid, "tracks");

    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const fav = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteAlbum(fav);
      console.log(fav);
    });

    return () => unsubscribe();
  }, []);
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
          to={"/favorite"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass} ${!user && "hidden"}` : `${baseClass} ${!user && "hidden"}`
          }
        >
          <Heart className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>
            Favorite
          </p>
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive ? `${baseClass} ${activeClass} ${!user && "hidden"}` : `${baseClass} ${!user && "hidden"}`
          }
        >
          <User className="size-6  " />
          <p className={`${fullCenterDisplay ? "block" : "hidden"}`}>Profile</p>
        </NavLink>
        
      </div>
      {favoriteAlbum.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center text-sm">
            <h1 className="text-zinc-400">Favourites</h1>
            <Link
              to={"/favorite"}
              className={`text-sm underline font-thin cursor-pointer ${
                fullCenterDisplay ? "block" : "hidden"
              }`}
            >
              See all
            </Link>
          </div>
          <div className="flex-col flex gap-3 mt-3">
            {favoriteAlbum.slice(0, 7).map((fav) => (
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => navigate(`/music/${fav.type}/${fav.id}`)}
              >
                <img
                  src={fav?.cover_small || fav?.picture_small}
                  alt=""
                  className={`block rounded ${
                    fullCenterDisplay ? "md:w-12 lg:w-12" : "w-12 mx-auto"
                  }`}
                />
                <div className={`${fullCenterDisplay ? "block" : "hidden"}`}>
                  <p>{fav?.title}</p>
                  <p className="text-xs w-full text-zinc-400">
                    {fav?.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
