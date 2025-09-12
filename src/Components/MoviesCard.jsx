import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "./Spinner";
import { X } from "lucide-react";

const MoviesCard = ({
  search,
  setSearch,
  searchResult,
  setSearchResult,
  searchMovies,
  setSearchMovies,
  loading,
  setLoading,
}) => {
  const API_KEY = "0855565ab8a6d5f5b408c3f9927cc57c";
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getTrendingMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fayching post", error);
      }
      setLoading(false);
    };
    getTrendingMovie();
  }, []);

  const clearSearchFunction = () => {
    setSearchResult("")
  };
  return (
    <div className="my-10 mx-4 md:mx-10" id="movie">
      <div className="flex justify-between items-center">
        <p className="headline-2 font-bold">
          {searchResult ? `Search Results for "${searchResult}"` : "Trending"}
        </p>

        {searchResult ? <button className=" block md:hidden menu-btn" onClick={clearSearchFunction}><X className="size-5"/></button> : null}
      </div>
      {loading ? (
        <Spinner />
      ) : searchResult ? (
        // Search results grid
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-5">
          {searchMovies.map((movie) => (
            <div
              key={movie.id}
              className="rounded cursor-pointer group relative overflow-hidden shadow-lg" onClick={()=>navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Hidden Info */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white 
                        opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 
                        transition-all duration-500"
              >
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <div className="flex gap-2 items-center text-yellow-600">
                  <FontAwesomeIcon icon={faStar} />
                  <p className="font-bold">{movie.vote_average}</p>
                </div>
                <button className="w-full py-1 rounded-xl bg-blue-800 mt-3 cursor-pointer">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Trending grid
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="rounded cursor-pointer group relative overflow-hidden shadow-lg" onClick={()=>navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Hidden Info */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white 
                        opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 
                        transition-all duration-500"
              >
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <div className="flex gap-2 items-center text-yellow-400">
                  <FontAwesomeIcon icon={faStar} />
                  <p className="font-bold">{movie.vote_average}</p>
                </div>
                <button className="w-full py-1 rounded-xl bg-blue-800 mt-3 cursor-pointer">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesCard;
