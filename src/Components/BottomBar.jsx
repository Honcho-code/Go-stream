import { Forward, Mic, Mic2, PanelRightInactiveIcon, Pause, Play, Plus, SkipBack, SkipForward, Speaker } from "lucide-react";
import React from "react";

const BottomBar = () => {
  return (
    <div
      className={`block fixed bottom-0 w-full backdrop:blur-lg  px-5 py-4 bg-zinc-800`}
    >
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Logo1.png" alt="" className="w-10 h-10 object-cover" />
            <div>
              <p className="text-sm">PIMMIE'S DILEMMA</p>
              <p className="text-xs text-zinc-400">Drake ft PartyNextDoor</p>
            </div>
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <div><SkipBack/> </div>
            <div className="bg-blue-300 p-3 rounded-full"><Play/> </div>
            <div><SkipForward/> </div>
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <div><Speaker/> </div>
            <div><Mic2/> </div>
          </div>
          <div className="cursor-pointer block md:hidden">
            <Pause/>
          </div>
      </div>
    </div>
  );
};

export default BottomBar;
