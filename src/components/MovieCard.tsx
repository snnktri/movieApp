import type { MovieType } from "../types/movie";
//probs type
interface Movie {
  movie: MovieType;
  addMovie?: (movie: MovieType) =>void;//addMovie is optional cause it will not be in the favMovies
  removeMovie: (movie: MovieType) =>void
}

//  const moviesFromLocal = localStorage.getItem("movies");
//  // console.log(moviesFromLocal);
//   const movies = moviesFromLocal ? JSON.parse(moviesFromLocal) : [];

const MovieCard = ({ movie, addMovie, removeMovie }: Movie) => {

 // console.log(movie)

  return (
    <div className="">
      <div className="w-60 sm:w-auto flex flex-col items-center rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out p-4">
        <div className="w-48 h-64 bg-gray-300 rounded-xl overflow-hidden mb-4">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full">
          <p className="font-semibold text-lg text-gray-800 overflow-x-auto">{movie.Title}</p>
          <p className="text-gray-500 text-sm">{movie.Year}</p>
        </div>
      </div>
      {/* button to toggle between addFav and remove from fav */}
      {
        !movie.isFav ? 
        (
          <button
        onClick={() => addMovie?.(movie)}
        className="w-full mt-4 bg-blue-500 py-2 rounded-xl text-white hover:bg-blue-600 cursor-pointer transition-colors"
      >
        Add To Favourite
      </button>
        ):
        (
          <button
        onClick={() => removeMovie(movie)}
        className="w-full mt-4 bg-red-500 py-2 rounded-xl text-white hover:bg-red-600 cursor-pointer transition-colors"
      >
        Remove From Fav
      </button>
        )
      }
    </div>
  );
};

export default MovieCard;
