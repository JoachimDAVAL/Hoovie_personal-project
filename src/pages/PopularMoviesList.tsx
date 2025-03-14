import { useEffect, useState, useRef } from "react";
import { IMovie } from "../@types";
import MovieCard from "../components/MovieCard";
import {getPopularMovies} from "../services/api";

export default function MoviesList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(page); 

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    if (hasMore) {
      fetchMovies();
    }
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  if (!movies) {
    return <div className="fixed inset-0 flex justify-center items-center"> <div className="loader"></div> </div>;
  }

  return (
    <div className="grid grid-cols-5 gap-4 pl-10 pr-10 content-center items-center">

        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

        {hasMore &&  (<div className="flex justify-center items-center mt-4"> <div ref={loader} className="loader"></div> </div>) }

    </div>
  );
}
