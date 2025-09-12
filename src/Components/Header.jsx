import { faBookmark, faCheck, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const Header = () => {
  const API_KEY = "0855565ab8a6d5f5b408c3f9927cc57c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const {id} = useParams();

  const [headerMovie, setHeaderMovies] = useState(null);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    const getTrendingMovie = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        const data = await res.json();
        if (data.results) {
          const randomMovie =
            data.results[Math.floor(Math.random() * data.results.length)];

          setHeaderMovies(randomMovie);
        }
      } catch (error) {
        console.error("Error fayching post", error);
      }
    };
    getTrendingMovie();
  }, []);

  const addMovieToWatchList = async (headerMovie) => {
  const user = auth.currentUser;
  if (!user) {
    toast.error("Login to add movies to your watchlist");
    return;
  }
  try {
    await setDoc(
      doc(db, "users", user.uid, "watchlist", headerMovie.id.toString()),{
        ...headerMovie,
        createdAt: serverTimestamp()
      }
    )
    setAddedToWatchlist(true)
    toast.success(`"${headerMovie.title}" added to your watchlist`)
  } catch (error) {
    console.error("Error adding movie to watchlist", error)
  }
}
  const removeWatchlist = async(headerMovie)=>{
      const user = auth.currentUser;
      if(!user){
        toast.error("Login to remove movies from your watchlist")
        return
      }
      try {
        await deleteDoc(
          doc(db, "users", user.uid, "watchlist", headerMovie.id.toString())
        )
        setAddedToWatchlist(false)
        toast.success(`"${headerMovie.title}" removed from your watchlist`)
      } catch (error) {
        console.error("Error removing movie from watchlist", error)
      }
  }
  useEffect(()=>{
      const checkAddedToWatchlist = async()=>{
          const user = auth.currentUser;
          if(!user){
              setAddedToWatchlist(false)
              return
          }
          try {
            const docRef = doc(db, "users", user.uid, "watchlist", id.toString())
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
              setAddedToWatchlist(true)
            }else{
              setAddedToWatchlist(false)
            }
          } catch (error) {
            console.error("Error checking watchlist", error)
          }
      }
      checkAddedToWatchlist()
  },[headerMovie, auth.currentUser])

  return (
    <section className="relative md:h-[90vh] lg:h-[90vh] h-[90vh] bg-cover bg-center md:mt-0">
      <div className="absolute w-full h-full bg-zinc-900/50 z-10"></div>
      <video
        src="/HomeVideo.mp4"
        autoPlay
        loop
        className="absolute w-full h-full object-cover"
      ></video>
      <div className="absolute bottom-10  px-4 md:px-10 z-10 max-w-2xl">
        {headerMovie && (
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
              {headerMovie.title}
            </h1>
            <p className="md:text-lg font-light">{headerMovie.overview}</p>
            <div className="flex items-center gap-3 mt-3 md:mt-5">
              <div
                className="btn bg-blue-800 cursor-pointer"
                onClick={() => navigate(`/movie/${headerMovie.id}`)}
              >
                <FontAwesomeIcon icon={faPlay} />
                <p>Watch Trailer</p>
              </div>

              <div
                className="btn bg-zinc-700 cursor-pointer"
                onClick={addedToWatchlist ? ()=>removeWatchlist(headerMovie) : ()=>addMovieToWatchList(headerMovie)}
              >
                <FontAwesomeIcon icon={addedToWatchlist ? faCheck : faBookmark} />
                <p>{addedToWatchlist ? "Remove Watchlist" : "Add WatchList"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
