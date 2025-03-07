import { useParams } from "react-router-dom";
import { IMovie } from "../@types";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du film :", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>Chargement du film...</p>;
  }

  return (
    <div className="place-items-center">
      <h1 className="text-4xl font-bold m-10">{movie.title}</h1>
      <div className="flex p-10 items-center">
        <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
        alt={movie.title}
        className="max-h-200 rounded-xl"
      />
      <div className=" place-content-around m-10 ">
        <p className="">{movie.overview}</p>
        <p>Date de sortie : {movie.release_date}</p>
        <p>Note moyenne : {movie.vote_average}</p>
        <p>Nombre de votes : {movie.vote_count}</p>
        <p>Langue originale : {movie.original_language}</p>
        <p>Titre original : {movie.original_title}</p>
        <p>Genres : {movie.genre_ids?.join(", ")}</p>
      </div>
      </div>
      

      
    </div>
  );
}
