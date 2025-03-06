import { useEffect, useState } from "react";
import { IMovie } from "../@types";
import MovieCard from "../components/MovieCard";
import {getPopularMovies} from "../services/api";

export default function MoviesList() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(); // Attendre les films
        setMovies(data); // Mettre à jour le state avec les résultats
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchMovies();
  }, []); // Exécuter une seule fois au montage

  return (
    <div className="movies-list">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p>Chargement des films...</p>
      )}
    </div>
  );
}
