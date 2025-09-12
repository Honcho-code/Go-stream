import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SimilarMovies = () => {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const API_KEY = "0855565ab8a6d5f5b408c3f9927cc57c";
  const BASE_URL = "https://api.themoviedb.org/3";
    useEffect(()=>{
        const fetchSimilarMovies = async()=>{
            try {
                const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
                const data = await res.json();
                setSimilarMovies(data.results)
                console.log(data.results)
            } catch (error) {
                console.error("Error fetching similar movies", error)
            }
        }
        fetchSimilarMovies()
    },[id])
    const navigate = useNavigate();
    const displayMovies = showAll ? similarMovies : similarMovies.slice(0, 8)
  return <div className="my-6 md:my-10 mx-4 md:mx-10">
    <p className="headline-2 font-bold flex items-center justify-between text-center">
          Similar movies
        </p>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-5 md:mt-10">
          {displayMovies.map((movie) => (
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
        {similarMovies.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-blue-800 text-white rounded-2xl cursor-pointer hover:bg-blue-700 transition"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ?<ChevronDown className="inline-block ml-2 rotate-180 transition-transform"/> : <ChevronDown className="inline-block ml-2 transition-transform"/>}
          </button>
        </div>
        )}
  </div>;
};

export default SimilarMovies;
