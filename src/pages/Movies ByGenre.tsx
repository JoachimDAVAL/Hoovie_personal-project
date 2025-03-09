import { useState, useEffect, useRef } from "react";
import { IMovie } from "../@types";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/api";
import { useParams } from "react-router-dom";



export default function MoviesByGenre() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {id}  = useParams<{ id: string }>();

  const loader = useRef(null);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(Number(id), page);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    if(hasMore) {
      fetchMovies();
    }
  }, [id, page, hasMore]);

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



  return (
    <div className="grid grid-cols-4 gap-4 pl-10 pr-10">

      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

      {hasMore && <div ref={loader} className="text-center">Chargement...</div>}
      
    </div>
  )
}