import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Save } from "lucide-react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [topmix, setTopmix] = useState(null);
  const navigate = useNavigate()
  const BASE_URL = "https://go-stream-livid.vercel.app/api/deezer";

  useEffect(() => {
    setLoading(true);
    const fetchTopMix = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}?endpoint=search/album?q=artist:"drake" album:"$ome $exy $ongs 4 U"`
        );
        const data = await res.json();
        setTopmix(data.data.length > 0 ? data.data[0] : null);
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
      transition={{ duration: 0.5 }}
      className="mx-4 my-5 md:my-10 relative h-50 md:h-70 bg-zinc-800 bg-contain overflow-hidden rounded-2xl"
    >
      <div className="absolute h-full w-full bg-black/50 top-0 overflow-hidden"></div>

      <img
        src={topmix?.cover_medium}
        alt={topmix?.album?.title || "Album"}
        className="h-full w-full object-cover overflow-hidden"
      />

      <div className="absolute bottom-6 left-4">
        <h1 className="text-3xl font-bold md:font-extrabold">
          {topmix?.album?.title || "$ome $exy $ongs 4 U"}
        </h1>
        <p className="text-lg font-thin">
          Album - {topmix?.artist?.name || "Drake & PartyNextDoor"}
        </p>
        <div className="flex gap-4 mt-3">
          <button className="btn" onClick={() => navigate(`/music/${topmix.type}/${topmix.id}}`)}>
            <Play />
            <p>Stream Album</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
