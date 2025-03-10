import { useParams } from "react-router-dom";
import { IMovie } from "../@types";
import { useEffect, useState } from "react";
import { getMovieById, getProvidersByMovieId } from "../services/api";

interface IProvider {
  provider_id: number;
  provider_name: string;
  logo_path?: string;
  display_priority: number;
  _id?: string;
}

interface IWatchProviders {
  [countryCode: string]: {  // Exemple : "US", "FR", etc.
    flatrate?: IProvider[];  // Liste des providers offrant le contenu en streaming
    rent?: IProvider[];      // Liste des providers pour la location
    buy?: IProvider[];       // Liste des providers pour l'achat
  };
}

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [providers, setProviders] = useState<IWatchProviders>({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du film :", error);
      }
    };

    const fetchProviders = async () => {
      try {
        const data = await getProvidersByMovieId(Number(id));
        setProviders(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs :", error);
      }
    };

    fetchMovie();
    fetchProviders();
  }, [id]);

  if (!movie) {
    return <p>Chargement du film...</p>;
  }

  const renderProviders = () => {
    const countryProviders = providers['US']; 
    if (!countryProviders) return <p>Aucun fournisseur disponible</p>;

    const flatProviders = countryProviders.flatrate;
    if (!flatProviders || flatProviders.length === 0) return <p>Aucun fournisseur de streaming disponible</p>;

    return (
      <div>
        <h2>Disponible sur :</h2>
        <div className="flex flex-wrap gap-4">
          {flatProviders.map(provider => (
            <div key={provider.provider_id} className="flex items-center">
              {provider.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="h-8 mr-2"
                />
              )}
              <span>{provider.provider_name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="place-items-center">
      <h1 className="text-4xl font-bold m-10">{movie.title}</h1>
      <div className="flex p-10 items-center">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
          alt={movie.title}
          className="max-h-200 rounded-xl"
        />
        <div className="place-content-around m-10">
          <p>{movie.overview}</p>
          <p>Date de sortie : {movie.release_date}</p>
          <p>Note moyenne : {movie.vote_average}</p>
          <p>Nombre de votes : {movie.vote_count}</p>
          <p>Langue originale : {movie.original_language}</p>
          <p>Titre original : {movie.original_title}</p>
          <p>Genres : {movie.genre_ids?.join(", ")}</p>
        </div>
      </div>

      {renderProviders()}
    </div>
  );
}
