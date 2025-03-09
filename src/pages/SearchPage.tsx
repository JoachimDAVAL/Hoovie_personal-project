import { useEffect, useState, useRef } from "react";
import { IMovie } from "../@types";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { httpRequester } from "../services/api"; // Assurez-vous d'importer httpRequester

export default function SearchPage() {
  const [query, setQuery] = useState(""); // État pour la query de recherche
  const [movies, setMovies] = useState<IMovie[]>([]); // Liste des films
  const [page, setPage] = useState(1); // Numéro de la page pour la pagination
  const [hasMore, setHasMore] = useState(true); // Vérifier si il y a encore des films à charger
  const loader = useRef(null); // Pour le loader de défilement

  // Fonction pour récupérer les films depuis l'API
  const getMoviesBySearch = async (query: string, page: number) => {
    try {
      const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
        '/search/movie', {
          params: {
            query: query,
            include_adult: 'true',
            include_video: 'true',
            language: 'en-US',
            page: page,
          }
        });
      return httpResponse.data.results;
    } catch (error) {
      console.error("Erreur lors de la récupération des films : ", error);
      throw new Error("Impossible de récupérer les films populaires.");
    }
  };

  const handleSearchResults = (newMovies: IMovie[]) => {
    setMovies(newMovies); // Mettre à jour les films
    setHasMore(true); // Réinitialiser hasMore à true après chaque nouvelle recherche
    setPage(2); // Commencer la pagination à partir de la page 2
  };

  // Requête API lors du changement de page ou de query
  useEffect(() => {
    if (query.trim() !== "") {
      setPage(1); // Réinitialiser à la page 1 à chaque nouvelle recherche
      setMovies([]); // Réinitialiser la liste des films
      setHasMore(true); // Réinitialiser la vérification de pagination
    }
  }, [query]);

  // Récupération des films à partir de l'API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesBySearch(query, page);

        if (data.length === 0) {
          setHasMore(false); // Si aucun film trouvé, désactiver la pagination infinie
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    if (hasMore) {
      fetchMovies(); // Appel API si hasMore est true
    }
  }, [page, query, hasMore]);

  // Détection du défilement avec IntersectionObserver pour la pagination infinie
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Charger la page suivante
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
      <h2>Search Results</h2>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {hasMore && <div ref={loader} className="text-center">Chargement...</div>}
    </div>
  );
}
