import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Related = () => {
    const [loading, setLoading] = useState(false)
  const [topmix, setTopmix] = useState([])
  const BASE_URL =  "https://go-stream-livid.vercel.app/api/deezer"

 useEffect(() => {
  setLoading(true);
  const fetchTopMix = async () => {
    try {
      const res = await fetch(`${BASE_URL}?endpoint=search/album?q="drake"`);
      const data = await res.json();
      setTopmix(data.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching top mix:", error);
      // setLoading(false);
    }
  };
  fetchTopMix();
}, []);
  if(loading){
    return 
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-4 mt-5"
    >
      <div>
        <h1 className="headline-3">Made for {auth.currentUser ? `${auth.currentUser.displayName}`: "User"}</h1>
        <div className="overflow-x-auto scrollbar-hide scrollbar-track-transparent">
          <div className="flex mt-5 gap-4 flex-shrink-0 w-40 md:w-80 h-40 md:h-80">
            {topmix.map((mix)=>(
              <Link to={`/music/${mix.type}/${mix.id}`} key={mix.id} className="relative w-40 md:w-80 h-40 md:h-80 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={mix.cover_medium}
                  alt={mix.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-lg font-semibold">{mix.title}</h2>
                  <p className="text-gray-300 text-sm">{mix.artist.name}</p>
                </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

}

export default Related