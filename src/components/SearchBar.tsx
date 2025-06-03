import { useState } from "react";
import type { MovieType } from "../types/movie";//types importing
import axios from "axios";//from fetching api(call easy way)


interface Props {
  setSearchResult: (movies: MovieType[]) => void//props types
}

const SearchBar = ({setSearchResult}:Props) => {
    const [searchTxt, setSearchTxt] = useState<string>("");
   // const [movies, setMovies] = useState<MovieType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {//need to define types for event in ts
        setSearchTxt(e.target.value);
    }

    const handleSubmit = async (e:React.FormEvent): Promise<void>=> {
      e.preventDefault();//to handle default form handaling mechanism
      setLoading(true)
      setError(null);
      ;
    //  console.log("serch item", searchTxt)
      try {
        //api call with axos
        const res = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=7c8888b2&s=${searchTxt}&page=1`);//only fetching one
        //page of movies some tile gives lot of movies cause it work on regx on movie title
        if (res.data.Response === "True" && res.data.Search) {//if response exist setData
          const data: MovieType[] = res.data.Search.map((movie: any) => (
            {
              ...movie,
              isFav: false//setting is fav initially false for all the movies, series or episode
            }
          ));
          setSearchResult(data);
          setSearchTxt('');
      } else {
          throw new Error(res.data.Error || "Movies not found");//setting errors with default
      }
      } catch (err: any) {
        setError(err?.message || "Movies not found");
        setSearchResult([]);//if not found set empty array
      }
      finally {//finally always execute and make setloading(false)
        setLoading(false);
      }
    }


  //  console.log(movies);//debugging
  return (
    <div className="w-[40%] flex items-center flex-col">
      <form onSubmit={handleSubmit} className="">
        {/* input field */}
        <div>
            <input type="text"
            onChange={handleSearch}
            value={searchTxt}
            placeholder="search movies"
            className="w-80 border px-3 py-2 rounded-md focus:outline-none
        focus:ring-1 focus:ring-blue-500
        placeholder:text-gray-800 shadow-xl" />
        </div>
        {/* button for form submit */}
        <button type="submit"
        className="mt-4 w-80 text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700
         hover:scale-105 cursor-pointer transition-all" disabled={loading}>
          {loading ? "Searching..." : "Search Movie"}
          </button>
      </form>
      {/* funtion to show erros if present */}
    {error && <p className="text-red-500 text-xl mx-auto">{error}</p>}
    </div>
  )
}

export default SearchBar
