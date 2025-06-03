import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import type { MovieType } from "./types/movie";
import Movies from "./components/Movies";
import FavouriteMovie from "./components/FavouriteMovie";


const App = () => {
  const [searchResult, setSearchResult] = useState<MovieType[]>([]);//to store search result
  const [favMovies, setFavMovies] = useState<MovieType[]>([]);//to store local storage items
  const isInitialMount = useRef<boolean>(true);//to handle first run which making locastorage items not persistant
  const [updateMovie, setUpdatedMovie] = useState<MovieType[]>([]);//to store movie after comparing with favMovies

  useEffect(() => {
    const localMovie = localStorage.getItem('movies');
    const moviesExist = localMovie ? JSON.parse(localMovie) : [];
    setFavMovies(moviesExist);
  }, []);
useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return; // skiping first run to get the localstorage items easyly
    //otherwise it gives null values of local storage (bug which takes lot of times to fix)
  }

  localStorage.setItem('movies', JSON.stringify(favMovies));
}, [favMovies]);//dependenciy is favMovies if it changes localstorage will change and overall function will be dynamic

useEffect(() => {
  const movieTobeUpdated = searchResult.map((m: MovieType) => {
    const fav = favMovies.find((f: MovieType) => f.imdbID === m.imdbID);
    return fav ?? m;
  });

  setUpdatedMovie(movieTobeUpdated);
}, [searchResult, favMovies]);//changes when search rsult or favMovies changes

//props lifting (using due to not using any kind of contextHook to manage global state so probs drilling and
//props lifing required)
  const addMovie = (movie: MovieType) => {
    const movieExist = favMovies.find((m:MovieType) => m.imdbID === movie.imdbID);

    if(!movieExist) {
      const m = {
        ...movie, isFav: true
      }
      setFavMovies([...favMovies, m]);
    }
  }
//functoin to remove fav movie from list(localstorage)
  const removeMovie = (movie: MovieType) => {
    const movies = favMovies.filter((m:MovieType) => m.imdbID !==movie.imdbID);
    setFavMovies(movies);
  }

   return (
  <div className="min-h-screen w-screen bg-gradient-to-r from-blue-100 to-pink-100 p-8">
    <div className="flex flex-col items-center p-6">
      <SearchBar setSearchResult={setSearchResult} />
       <div className="w-full max-w-7xl mt-8">
          <Movies movies={updateMovie}
                  favMovies={favMovies}
                  addMovie={addMovie}
                  removeMovie={removeMovie}
                   />
        </div>
        <div className="w-full max-w-7xl mt-8">
          <FavouriteMovie 
          favMovies={favMovies}
          removeMovie={removeMovie}
          />
        </div>
    </div>
  </div>
  );
}

export default App
