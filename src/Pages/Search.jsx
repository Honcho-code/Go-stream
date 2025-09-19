import { ChevronLeft, Search, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { motion } from "framer-motion";
import { PlayerContext, usePlayer } from "../context/PlayerContext";


const SearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedMusic, setSearchMusic] = useState();

  const {playTrack} = useContext(PlayerContext)
  const BASE_URL = "https://go-stream-livid.vercel.app/api/deezer";
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (!search.trim()) {
      setSearchMusic([]);
      return;
    }
    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}?endpoint=search?q=${search}`);
        const data = await res.json();
        setSearchMusic(data.data || []);
        console.log(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="block md:hidden p-4">
      <div>
        <div className="menu-btn mb-5" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <form className="flex flex-row h-10 items-center justify-between bg-zinc-50/10 ring-inset ring-1 ring-zinc-50/[0.02] rounded-sm backdrop-blur-2xl hover:bg-zinc-50/15 transition-[transform,background-color] cursor-pointer px-3 w-full">
            <div className="flex items-center gap-2 w-full">
              <Search className="text-zinc-400" />
              <input
                type="text"
                placeholder="Search songs, albums, playlist, artist..."
                className="w-full outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div
              onClick={() => setSearch("")}
              className={`${search.length > 0 ? "block" : "hidden"}`}
            >
              <X className="text-zinc-300" />
            </div>
          </form>
          {search && (
            <div className="w-full h-full z-50 rounded-b-2xl overflow-y-auto scrollbar-hide scrollbar-track-transparent  py-4">
              {loading ? (
                <Spinner />
              ) : searchedMusic.length > 0 ? (
                searchedMusic.map((music) => (
                  <div
                    key={music.id}
                    className="mb-2 cursor-pointer"
                    onClick={() => playTrack(music, searchedMusic)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={music?.album?.cover_small}
                        alt={music?.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{music?.title}</p>
                        <p className="text-xs text-zinc-400">
                          {music?.artist?.name} •{" "}
                          {formatDuration(music?.duration)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">No results found.</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
