import React from "react";
import Header from "../Components/Header";
import MoviesCard from "../Components/MoviesCard";

const HomePage = ({search, setSearch, searchResult, setSearchResult, handleSearchMovie, searchMovies, setSearchMovies, loading,
setLoading}) => {
  return (
    <div>
      <Header/>
      <MoviesCard search={search} setSearch={setSearch} searchResult={searchResult} setSearchResult={setSearchResult} handleSearchMovie={handleSearchMovie} searchMovies={searchMovies} setSearchMovies={setSearchMovies} loading={loading} setLoading={setLoading}/>
    </div>
  );
};

export default HomePage;
