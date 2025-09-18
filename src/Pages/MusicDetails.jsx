import React from "react";
import { motion } from "framer-motion";
import Navber from "../Components/Navber";
import { Dot, LucideMenu, Play, Shuffle } from "lucide-react";

const MusicDetails = () => {
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
        <img src="/Banner.jpg" alt="" className="object-cover w-full h-full" />
        <div className="absolute bottom-6 w-full px-4 flex justify-between items-end ">
          <div>
            <h1 className="text-3xl font-bold md:font-extrabold">
              $ome $exy $ongs 4 U{" "}
            </h1>
            <p className="text-lg font-thin">Album - Drake & PartyNextDoor</p>
          </div>
          <div className="flex items-center gap-7">
            <div className="hidden md:block">
              <Shuffle />
            </div>
            <div className="bg-blue-300 p-3 rounded-full cursor-pointer">
              <Play />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-4 md:mx-0 mt-3">
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm text-blue-300">PIMMIE'S DILEMMA</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-blue-300">02:23</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">CN TOWER</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">MOTH BALLS</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">SOMETHING ABOUT YOU</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">CRYING IN CHANEL</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">SPIDER-MAN SUPERMAN</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">DEEPER</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            {/* music list */}
            <div className="flex justify-between items-center border-b pb-3 border-zinc-700">
            <div className="flex items-center gap-3">
                <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
                <div>
                <p className="text-sm">SMALL TOWN FAME</p>
                <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-thin text-zinc-300">02:16</p>
            </div>
            </div>
            
      </div>
    </motion.div>
  );
};

export default MusicDetails;
