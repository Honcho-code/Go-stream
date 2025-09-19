import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navber from "../Components/Navber";
import { auth, db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from "../Components/Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const [favoriteAlbum, setFavoriteAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth?.currentUser;
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("error signing out", error);
    }
  };
  useEffect(() => {
    const user = auth?.currentUser;
    setLoading(true);
    if (!user) return;

    const favRef = collection(db, "favorite", user.uid, "tracks");

    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const fav = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteAlbum(fav);
      console.log(fav);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mb-20"
    >
      <Navber />
      <div className="w-full h-80 bg-zinc-800 relative">
        <div className="absolute h-full w-full bg-gradient-to-b  from-zinc-900/50 to-zinc-900 overflow-hidden top-0"></div>
        <img
          src={user?.photoURL}
          alt=""
          className="object-cover w-full h-full"
        />
        <div
          className="absolute top-3 right-0 mx-4 px-3 py-2 flex items-center gap-2 bg-red-500 rounded-lg"
          onClick={handleSignOut}
        >
          <FontAwesomeIcon icon={faDoorOpen} />
          <p>Log out</p>
        </div>
        <div className="absolute bottom-6 w-full px-4 flex justify-between items-end ">
          <div className="flex items-center gap-3 md:gap-5">
            <img
              src={user?.photoURL}
              alt=""
              className="rounded-full border-4 border-blue-300"
            />
            <div>
              <h1 className="text-3xl font-bold md:font-extrabold">
                {user?.displayName}
              </h1>
              <p className="text-lg font-thin">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-7"></div>
        </div>
      </div>
      {/* {favorite note} */}

      <div className="mx-4 mt-5 mb-20">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex justify-between items-center">
                <h1 className="headline-3">Your Favourites</h1>
                <p className="text-sm text-zinc-400 underline" onClick={()=>navigate("/favorite")}>See all</p>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-4">
                {favoriteAlbum.slice(0, 4).map((fav) => (
                  <Link
                    to={`/music/${fav.type}/${fav.id}`}
                    key={fav.id}
                    className="relative rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={fav?.cover_medium || fav?.picture_medium}
                      alt={fav?.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h2 className="text-white text-lg font-semibold">
                        {fav?.title}
                      </h2>
                      <p className="text-gray-300 text-sm">
                        {fav?.artist?.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
