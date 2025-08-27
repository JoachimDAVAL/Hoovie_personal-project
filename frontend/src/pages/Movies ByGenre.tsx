/// <reference lib="dom" />
import { useRef, useEffect } from "react";
import { useMovieFilter } from "../contexts/FilterAndSortByContext";
import MovieCard from "../components/MovieCard";



export default function MoviesByGenre() {

const { movies, hasMore, loadMoreMovies} = useMovieFilter();
                                                                                                                                                             

const loader = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMovies();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loadMoreMovies]);



  return (
    <div>

      {/* <div className="relative h-[90vh]">
        <HomeText />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:px-10 content-center justify-center items-center place-items-center">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

        {hasMore &&  (<div className="flex justify-center items-center mt-4"> <div ref={loader} className="loader"></div> </div>) }
      </div>

      
    </div>
  )
}