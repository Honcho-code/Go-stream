import React, { useContext } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PlayerContext } from "../context/PlayerContext";

const RightSidebar = ({ fullCenterDisplay, setFullCenterDisplay }) => {
  const { currentTrack, queue, currentIndex } = useContext(PlayerContext);

  // Grab next tracks
  const upcomingTracks = queue.slice(currentIndex + 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`hidden lg:block w-full border-l border-zinc-800 px-4 py-2 sticky top-0 bottom-0 h-screen overflow-hidden ${
        fullCenterDisplay ? "lg:col-span-4 hidden" : "lg:col-span-4"
      }`}
    >
      <div>
        <h1 className="text-lg font-semibold">🎧 Now Playing</h1>

        {/* Current Track */}
        {currentTrack ? (
          <>
            <img
              src={currentTrack?.album?.cover_medium}
              alt={currentTrack?.title}
              className="w-full h-60 object-cover mt-5 rounded-lg"
            />
            <div className="mt-5 flex justify-between items-center">
              <div>
                <p className="text-sm">{currentTrack?.title}</p>
                <p className="text-xs text-zinc-400 mt-1">
                  {currentTrack?.artist?.name}
                </p>
              </div>
              <div className="p-1 border rounded-full cursor-pointer">
                <Plus className="size-4" />
              </div>
            </div>
          </>
        ) : (
          <p className="text-zinc-400 mt-5">No song playing</p>
        )}

        {/* Next in queue */}
        {upcomingTracks.length > 0 && (
          <div className="bg-zinc-800 w-full px-3 py-3 rounded-lg mt-5">
            <h1 className="text-sm border-b border-zinc-600 pb-2 text-zinc-300">
              Playing next
            </h1>
            {upcomingTracks.map((track, i) => (
              <div key={track.id || i} className="flex items-center gap-3 mt-4">
                <img
                  src={track?.album?.cover_small}
                  alt={track?.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm">{track?.title}</p>
                  <p className="text-xs text-zinc-400">{track?.artist?.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RightSidebar;
