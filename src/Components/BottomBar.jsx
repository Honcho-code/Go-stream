import {
  Forward,
  Mic,
  Mic2,
  PanelRightInactiveIcon,
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  Speaker,
} from "lucide-react";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const BottomBar = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } =
    useContext(PlayerContext);
  if (!currentTrack) return null;
  return (
    <div
      className={`block fixed bottom-0 w-full backdrop:blur-lg  px-5 py-4 bg-zinc-800`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img
            src={currentTrack.album.cover_medium}
            alt=""
            className="md:w-12 md:h-12 w-10 h-10 object-cover rounded-lg"
          />
          <div>
            <p className="text-sm">{currentTrack.title}</p>
            <p className="text-xs text-zinc-400">{currentTrack.artist.name}</p>
          </div>
          </div>
          <div className="p-1 border-1 rounded-full cursor-pointer"><Plus className="size-4"/></div>
        </div>
        <div className="hidden md:flex gap-5 items-center cursor-pointer">
          <div onClick={prevTrack}>
            <SkipBack />
          </div>
          <div
            className="bg-blue-300 p-3 rounded-full cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </div>
          <div onClick={nextTrack}>
            <SkipForward />
          </div>
        </div>
        <div className="hidden md:flex gap-5 items-center cursor-pointer">
          <div>
            <Speaker />
          </div>
          <div>
            <Mic2 />
          </div>
        </div>
        <div className="flex md:hidden gap-5">
          <div onClick={prevTrack}>
            <SkipBack />
          </div>
          <div className="cursor-pointer" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
