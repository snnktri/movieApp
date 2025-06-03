import { useState } from "react";
import type { MovieType } from "../types/movie";
import MovieCard from "./MovieCard";
//import { useEffect, useState } from "react";

interface Props {//probs type
  movies: MovieType[];
  addMovie: (movie:MovieType) =>void;
  removeMovie: (movie: MovieType) =>void;
  favMovies: MovieType[];
}

const Movies = ({ movies, addMovie, removeMovie, favMovies }: Props) => {
  const [showOnlyFavs, setShowOnlyFavs] = useState<boolean>(false);
  

  const handleToggleView = ()=> {
    setShowOnlyFavs(prev => !prev);
  }

  const moviesToShow = showOnlyFavs
    ? movies.filter((m:MovieType) => favMovies.some((ml:MovieType) => ml.imdbID === m.imdbID))//to filter out simple
    : movies;
//console.log(favMovies);
//console.log(moviesToShow);
  return (
    <div className="w-full p-4">
      <div className="flex justify-end mb-4">
        <button
          className={`w-[10rem] py-2 ${!showOnlyFavs ? 'bg-green-500 hover:bg-grreen-600'
            : ' bg-blue-500 hover:bg-blue-600'} text-white roundeds-sm transition-all
            ease-in delay-70 duration-100
            cursor-pointer`}
          onClick={handleToggleView}
        >
          {showOnlyFavs ? "Show All" : "Show Favorites"}
        </button>
      </div>

      <ul className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
        {moviesToShow.map((m: MovieType) => (
          <MovieCard movie={m} key={m.imdbID}
          addMovie={addMovie}
          removeMovie={removeMovie} />
        ))}
      </ul>
    </div>
  );
};

export default Movies;
