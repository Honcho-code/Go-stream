import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const RightSidebar = ({ fullCenterDisplay, setFullCenterDisplay }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`hidden lg:block w-full border-l border-zinc-800 px-4 py-2 sticky top-0 bottom-0 h-screen ${
        fullCenterDisplay ? "lg:col-span-4 hidden" : " lg:col-span-4"
      }`}
    >
      <div>
        <h1>$ome $exy $ongs 4 U</h1>
        <img
          src="/Banner.jpg"
          alt=""
          className="w-full h-90 object-cover mt-5 rounded-lg"
        />
        <div className="mt-5 flex justify-between items-center">
          <div>
            <p className="text-sm">PIMMIE'S DILEMMA</p>
            <p className="text-xs text-zinc-400 mt-1">Drake ft PartyNextDoor</p>
          </div>
          <div className="p-1 border-1 rounded-full cursor-pointer">
            <Plus className="size-4" />
          </div>
        </div>
        <div className="bg-zinc-800 w-full px-3 py-3 rounded-lg mt-5">
          <h1 className="text-sm border-b border-zinc-600 pb-2 text-zinc-300">Playing next in queue</h1>
          <div className="flex items-center gap-3 mt-4 ">
            <img src="/Logo1.png" alt="" className="w-12 h-12 object-cover" />
            <div>
              <p className="text-sm">CN TOWER</p>
              <p className="text-xs text-zinc-400">Drake, PartyNextDoor</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <img src="/Logo1.png" alt="" className="w-12 h-12 object-cover" />
            <div>
              <p className="text-sm">SOMETHING ABOUT YOU</p>
              <p className="text-xs text-zinc-400">Drake, PartyNextDoor</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <img src="/Logo1.png" alt="" className="w-12 h-12 object-cover" />
            <div>
              <p className="text-sm">SOMEBODY LOVES ME</p>
              <p className="text-xs text-zinc-400">Drake, PartyNextDoor</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RightSidebar;
