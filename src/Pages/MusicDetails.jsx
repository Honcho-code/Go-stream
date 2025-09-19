import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Navber from "../Components/Navber";
import { Dot, Ellipsis, Heart, LucideMenu, Pause, Play, Shuffle } from "lucide-react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { PlayerContext } from "../context/PlayerContext";
import { auth, db } from "../config/firebase";
import {toast} from 'react-toastify'
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const MusicDetails = () => {
  const { id, type } = useParams();
  const [music, setMusic] = useState(null);
  const BASE_URL = "https://go-stream-livid.vercel.app/api/deezer";
  const [loading, setLoading] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false)
  const { playTrack, isPlaying, queue, togglePlay } = useContext(PlayerContext);


  const handleAddToFavorite = async(music)=>{
    const user = auth?.currentUser
    if(!user){
      toast.error("Signin to favorite Albums")
      return
    }
    try {
      const favRef = doc(db, "favorite", user.uid, "tracks", id)
      const snap = await getDoc(favRef)

      if(snap.exists()){
        await deleteDoc(favRef)
        setIsFavourited(false)
        toast.success("Removed from favorite")
      }else{
        await setDoc(favRef, {
          ...music,
          createdAt: serverTimestamp()
        })
        setIsFavourited(true)
        toast.success("Added to favorite")
      }
    } catch (error) {
      console.log("Error adding album to fav", error)
    }
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!id || !type) return;
      try {
        const res = await fetch(`${BASE_URL}?endpoint=${type}/${id}`);
        const data = await res.json();
        setMusic(data);
        setLoading(false);
        console.log(data);
        console.log(data.id);

        const user = auth?.currentUser
        if(user){
          const favRef = doc(db, "favorite", user.uid, "tracks", id)
          const snap = await getDoc(favRef)
          if(snap.exists()){
            setIsFavourited(true)
          }
        }
      } catch (error) {
        console.error("Error fetching music details:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) return <Spinner />;
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
          src={music?.type == "playlist" ? music?.picture_xl : music?.cover_xl}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute top-3 right-0 mx-4 menu-btn" onClick={()=>handleAddToFavorite(music)}><FontAwesomeIcon className={`${isFavourited ? "text-blue-300":"text-zinc-300"}`} icon={faHeart} /></div>
        <div className="absolute bottom-6 w-full px-4 flex justify-between items-end ">
          <div>
            <h1 className="text-3xl font-bold md:font-extrabold">
              {music?.title}
            </h1>
            <p className="text-lg font-thin">
              {music?.type && music?.type}-{music?.description || music?.label}
            </p>
          </div>
          <div className="flex items-center gap-7">
            <div className="hidden md:block">
              <Shuffle />
            </div>
            <div
              className="bg-blue-300 p-3 rounded-full cursor-pointer"
              onClick={() => {
                if (!music?.tracks?.data?.length) return;

                if (
                  queue.length > 0 &&
                  queue[0].album?.id === music.tracks.data[0].album?.id
                ) {
                  // Same album already in queue → just toggle play/pause
                  togglePlay();
                } else {
                  // Different album → start fresh queue
                  playTrack(music.tracks.data[0], music.tracks.data);
                }
              }}
            >
              {isPlaying ? <Pause /> : <Play />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-4 md:mx-0 mt-3">
        {/* music list */}
        {music?.tracks?.data?.map((track) => (
          <div
          key={track.id}
            className="flex justify-between items-center border-b pb-3 border-zinc-700 cursor-pointer"
            onClick={() => playTrack(track, music?.tracks?.data)}
          >
            <div className="flex items-center gap-3">
              <img
                src={track?.album.cover_small}
                alt=""
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="text-sm text-white">{track?.title}</p>
                <p className="text-xs text-zinc-400">{track?.artist.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 cursor-pointer">
              <Ellipsis />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MusicDetails;
