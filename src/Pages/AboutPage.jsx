import {
  faBookmark,
  faFilm,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const AboutPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = auth?.currentUser
  return (
    <div className="flex flex-col gap-4 my-10 mx-4 md:mx-10 lg:mx-20 text-center  items-center">
      <h1 className="headline-2">About MovieBing</h1>
      <p className=" max-w-2xl lg:max-w-3xl text-center text-lg md:text-xl font-light text-zinc-300 leading-relaxed  md:leading-loose">
        MovieBing is a platform that allows users to explore and discover
        movies. Our mission is to provide a comprehensive database of films,
        along with reviews and ratings from users around the world. MovieBing
        was fully designed and created my Rapheal Clinton with Love. want to
        chat on ur next big project? check out my{" "}
        <a href="https://rapheal-clinton.vercel.app" className="text-blue-600">
          portfolio
        </a>
        .
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 w-full">
        <div className="w-full md:max-w-sm flex flex-col gap-2 items-center py-6 ring ring-zinc-700 bg-zinc-800 rounded-lg">
          <FontAwesomeIcon icon={faFilm} className="text-3xl text-blue-700" />
          <h1 className="text-2xl lg:text-3xl">Discover Movies</h1>
          <p className=" w-70 text-lg font-light text-zinc-500">
            Search and explore a wide range of movies from all genres and
            decades.
          </p>
        </div>
        <div className="w-full md:max-w-sm flex flex-col gap-2 items-center py-6 ring ring-zinc-700 bg-zinc-800 rounded-lg">
          <FontAwesomeIcon icon={faSearch} className="text-3xl text-blue-700" />
          <h1 className="text-2xl lg:text-3xl">Smart Explore</h1>
          <p className=" w-70 text-lg font-light text-zinc-500">
            Quickly find movies by title, genre, or year with our powerful
            search engine.
          </p>
        </div>
        <div className="w-full md:max-w-sm flex flex-col gap-2 items-center py-6 ring ring-zinc-700 bg-zinc-800 rounded-lg">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-3xl text-blue-700"
          />
          <h1 className="text-2xl lg:text-3xl">Your Watchlist</h1>
          <p className=" w-70 text-lg font-light text-zinc-500">
            Save your favorites and access your personal watchlist anytime.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 items-center bg-blue-900/10 ring ring-blue-700/20 py-10 px-6 rounded-lg">
        <h1 className="headline-2">Explore Trending Movies Today</h1>
        <p className="text-lg font-light">Explore and take full control of your movie experience with MovieBing.</p>
        <button className="px-4 py-2 bg-blue-800 rounded-2xl" onClick={isAuthenticated ? ()=>navigate("/") : ()=>navigate("/signup")}>{isAuthenticated ? "Explore movies": "Get Started"}</button>
      </div>
    </div>
  );
};

export default AboutPage;
