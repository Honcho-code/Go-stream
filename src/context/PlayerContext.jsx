import { createContext, useContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();
export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio());

  const playTrack = (track, list = []) => {
    if (!track?.preview) return;

    if (list.length > 0) {
      setQueue(list);
      const index = list.findIndex((t) => t.id === track.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }

    audioRef.current.src = track.preview;
    audioRef.current.play();
    setIsPlaying(true);
  };
  // toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current.src) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // go to next track
  const nextTrack = () => {
    if (queue.length === 0) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    playTrack(queue[nextIndex]);
  };

  // go to previous track
  const prevTrack = () => {
    if (queue.length === 0) return;
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    playTrack(queue[prevIndex]);
  };
  useEffect(() => {
    audioRef.current.onended = () => nextTrack();
  }, [queue, currentIndex]);
  return (
    <PlayerContext.Provider
      value={{ 
        queue,
        currentIndex,
        currentTrack: queue[currentIndex],
        isPlaying,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
       }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
export const usePlayer = () => useContext(PlayerContext);
