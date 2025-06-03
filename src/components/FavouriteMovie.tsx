import type { MovieType } from "../types/movie";
import MovieCard from "./MovieCard";


interface Props {//props type
  favMovies: MovieType[];
  removeMovie: (movie: MovieType) => void;
}

const FavouriteMovie = ({favMovies, removeMovie}:Props) => {
    //  const moviesFromLocal = localStorage.getItem('movies');
    // const movies: MovieType[] = moviesFromLocal ? JSON.parse(moviesFromLocal) : [];

    // just needed to pass prbos cause i used probs lifting and driling so no use of any funciton here
 
  return (
    <div>
      <div>
        <h2 className="text-3xl text-gray-800 mb-6">Favurites Movies</h2>
        <div>
           <ul className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
        {favMovies.map((m: MovieType) => (
          <MovieCard movie={m} key={m.imdbID}
          removeMovie={removeMovie} />
        ))}
      </ul>
        </div>
      </div>
    </div>
  )
}

export default FavouriteMovie
