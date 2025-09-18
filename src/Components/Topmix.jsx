import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Spinner from "./Spinner";

const Topmix = () => {
  const [loading, setLoading] = useState(false)
  const [topmix, setTopmix] = useState([])
  const BASE_URL =  "https://api.deezer.com"

  useEffect(()=>{
    setLoading(true)
    const fetchTopMix = async()=>{
      try {
        const res = await fetch(`${BASE_URL}/chart/0/tracks`)
        const data = await res.json()
        setTopmix(data.data)
        setLoading(false)
        console.log(data);
      } catch (error) {
        console.log("error fetching top mix:", error);
        setLoading(false)
      }
    }
    fetchTopMix()
  },[])
  if(loading){
    return <Spinner/>
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-4"
    >
      <div>
        <h1 className="headline-3">Your top mixex</h1>
        <div className="overflow-x-auto scrollbar-hide scrollbar-track-transparent">
          <div className="flex mt-5 gap-4 flex-shrink-0 w-40 md:w-80 h-40 md:h-80">
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full w-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3 w-full">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Topmix;
