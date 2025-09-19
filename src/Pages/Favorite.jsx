import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from "../Components/Spinner";
import Navber from "../Components/Navber";

const Favorite = () => {
  const [favoriteAlbum, setFavoriteAlbum] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = auth?.currentUser;
    setLoading(true)
    if (!user) return;

    const favRef = collection(db, "favorite", user.uid, "tracks");

    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const fav = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteAlbum(fav);
      console.log(fav);
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);
  return (
        <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=""
    >
        <Navber/>
      <div className="mx-4 mt-5 mb-20">
        {loading ? (<Spinner/>):(
            <div>
                <h1 className="headline-3">Your Favourites</h1>
        <div className="mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-4">
            {favoriteAlbum.map((fav) => (
              <Link
                to={`/music/${fav.type}/${fav.id}`}
                key={fav.id}
                className="relative rounded-lg overflow-hidden flex-shrink-0"
              >
                <img
                  src={fav?.cover_medium ||fav?.picture_medium}
                  alt={fav?.title}
                  className="w-full h-full object-cover"
                />
                

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-lg font-semibold">
                    {fav?.title}
                  </h2>
                  <p className="text-gray-300 text-sm">{fav?.artist?.name}</p>
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

export default Favorite;
