import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SimilarMovies from "../Components/SimilarMovies";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const MovieDetail = () => {
  const API_KEY = "0855565ab8a6d5f5b408c3f9927cc57c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const [casts, setCasts] = useState([]);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [Comment, setComment] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const isAuthenticated = auth.currentUser;

  const addMovieToWatchList = async (movie) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Login to add movies to your watchlist");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", user.uid, "watchlist", movie.id.toString()),
        {
          ...movie,
          createdAt: serverTimestamp(),
        }
      );
      setAddedToWatchlist(true);
      toast.success(`"${movie.title}" added to your watchlist`);
    } catch (error) {
      console.error("Error adding movie to watchlist", error);
    }
  };
  const removeWatchlist = async (movie) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Login to remove movies from your watchlist");
      return;
    }
    try {
      await deleteDoc(
        doc(db, "users", user.uid, "watchlist", movie.id.toString())
      );
      setAddedToWatchlist(false);
      toast.success(`"${movie.title}" removed from your watchlist`);
    } catch (error) {
      console.error("Error removing movie from watchlist", error);
    }
  };
  useEffect(() => {
    const checkAddedToWatchlist = async () => {
      const user = auth.currentUser;
      if (!user) {
        setAddedToWatchlist(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid, "watchlist", id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAddedToWatchlist(true);
        } else {
          setAddedToWatchlist(false);
        }
      } catch (error) {
        console.error("Error checking watchlist", error);
      }
    };
    checkAddedToWatchlist();
  }, [movie, auth.currentUser]);

  const watchTrailer = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const youtubeTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (youtubeTrailer) {
        setTrailer(youtubeTrailer.key); // ⚡ store trailer key
        setOpenTrailer(true); // ⚡ open modal
      } else {
        alert("No trailer available");
      }
    } catch (error) {
      console.error("Error fetching trailer", error);
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie Detail", error);
      }
    };

    const fetchCasts = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await res.json();

        setCasts(data.cast);
      } catch (error) {
        console.error("Error fetching cast", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentRef = await collection(
          db,
          "movies",
          id.toString(),
          "comments"
        );
        const unsubscribe = onSnapshot(commentRef, (snapshot) => {
          const comments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllComments(comments);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
    fetchCasts();
    fetchMovieDetail();
  }, [id, setAllComments]);

  if (!movie) return <Spinner />;

  const addComment = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Login to add a comment");
      return;
    }
    if (Comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      const commentRef = collection(db, "movies", id.toString(), "comments");
      await addDoc(commentRef, {
        displayName: user.displayName,
        userEmail: user.email,
        text: Comment,
        createdAt: serverTimestamp(),
      });
      setComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="">
      {/* Banner */}
      <section className="relative md:h-[60vh] lg:h-[60vh] h-[50vh] bg-cover bg-center md:mt-0">
        <div className="absolute inset-0 w-full h-full bg-zinc-900/50 z-10 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
            {movie.title}
          </h1>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          className="absolute w-full h-full object-cover"
        />
      </section>

      {/* Info */}
      <div className="my-6 md:my-8 mx-4 md:mx-10 flex flex-col gap-5 md:gap-8 md:flex-row items-start md:items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className="rounded-2xl w-40 md:w-60 lg:w-70"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-2xl md:text-4xl font-semibold md:font-bold">
            {movie.title}
          </h1>
          <div className="flex gap-2 items-center text-yellow-400">
            <FontAwesomeIcon icon={faStar} />
            <p className="font-bold">{movie.vote_average}</p>
          </div>
          <p className="w-full lg:w-4xl">{movie.overview}</p>
          <div className="flex items-center gap-3 mt-3 md:mt-5">
            <div
              className="btn bg-blue-800 cursor-pointer"
              onClick={watchTrailer}
            >
              <FontAwesomeIcon icon={faPlay} /> <p>Watch Trailer</p>
            </div>
            <div
              className="btn bg-zinc-800 cursor-pointer"
              onClick={
                addedToWatchlist
                  ? () => removeWatchlist(movie)
                  : () => addMovieToWatchList(movie)
              }
            >
              <FontAwesomeIcon icon={addedToWatchlist ? faCheck : faBookmark} />{" "}
              <p>{addedToWatchlist ? "Remove Watchlist" : "Add WatchList"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Casts */}
      <div className="my-6 md:my-8 mx-4 md:mx-10">
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold">Cast</h1>
        <div className="mt-5 md:mt-8 flex gap-4 overflow-x-auto scrollbar-hide scrollbar-track-transparent pb-2">
          {casts.slice(0, 15).map((cast) => (
            <div key={cast.id} className="flex-shrink-0">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt=""
                className="w-25 md:w-30 rounded-xl"
              />
              <p className="text-sm font-semibold mt-2">{cast.name}</p>
              <p className="text-xs text-gray-400">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>

      <SimilarMovies />

      {/* Comment Section */}
      <div className="my-6 md:my-8 mx-4 md:mx-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-white text-xl md:text-2xl font-semibold md:font-bold">
            Comment on <span>"{movie.title}"</span>
          </h1>
          <h1 className="text-zinc-500 fomt-light text-lg mt-2">
            Share thoughts about this movie
          </h1>
          <div className="w-full md:max-w-xl">
            <textarea
              placeholder={`Share thoughts about "${movie.title}"`}
              value={Comment}
              rows={5}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-zinc-800 rounded-2xl ring-1 ring-blue-800 resize-none outline-none px-4 py-4 mt-3"
            ></textarea>
            <button
              className={`btn bg-blue-800 mt-3 cursor-pointer ${
                !isAuthenticated && "opacity-50 cursor-wait"
              }`}
              onClick={addComment}
              disabled={!isAuthenticated}
            >
              {isAuthenticated ? "Add Comment" : "Login to add comment"}
            </button>
          </div>
        </div>
        <div className="bg-zinc-800 rounded-2xl p-4 md:p-6">
          <h1 className="text-lg md:text-xl">All comments</h1>
          {allComments.length === 0 ? (
            <p className="text-zinc-500 mt-3">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            allComments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-zinc-700 last-of-type:border-0 py-3"
              >
                <p className="text-sm md:text-base">
                  <span className="font-semibold">{comment.displayName}</span>{" "}
                  <span className="text-zinc-500 text-xs">
                    ({comment.userEmail})
                  </span>
                </p>
                <p className="mt-1">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ⚡ Trailer Modal */}
      {openTrailer && trailer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black rounded-xl p-4 relative w-[90%] max-w-3xl">
            <button
              onClick={() => setOpenTrailer(false)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
