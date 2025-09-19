import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { PlayerContext, usePlayer } from "../context/PlayerContext";

const Tracks = () => {
  const [loading, setLoading] = useState(false);
  const [topmix, setTopmix] = useState([]);
  const BASE_URL = "https://go-stream-livid.vercel.app/api/deezer";
  const {playTrack} = useContext(PlayerContext)
  useEffect(() => {
    setLoading(true);
    const fetchTopMix = async () => {
      try {
        const res = await fetch(`${BASE_URL}?endpoint=chart/0/tracks`)
        const data = await res.json();

        
        setLoading(false);
        setTopmix(data.data);
      } catch (error) {
        console.log("error fetching top mix:", error);
      } finally {
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
        <h1 className="headline-3">Your tracks</h1>
        <div className="overflow-x-auto scrollbar-hide scrollbar-track-transparent">
          <div className="flex mt-5 gap-4 flex-shrink-0 w-30 md:w-50 h-30 md:h-50">
            {topmix.map((mix) => (
              <div
                key={mix.id}
                className="relative w-30 md:w-50 h-30 md:h-50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={()=>playTrack(mix, topmix)}
              >
                <img
                  src={mix.album.cover_medium}
                  alt={mix.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-lg font-semibold">
                    {mix.title}
                  </h2>
                  <p className="text-gray-300 text-sm">{mix.artist.name}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tracks;
