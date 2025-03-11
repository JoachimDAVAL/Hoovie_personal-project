import { useParams } from "react-router-dom";
import { IMovie } from "../@types";
import { useEffect, useState } from "react";
import { getMovieById, getProvidersByMovieId } from "../services/api";
import { BsFillStarFill } from "react-icons/bs";


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
    const countryProviders = providers['FR']; 
    if (!countryProviders) return <p className="col-span-2 col-start-1">Aucun fournisseur disponible</p>;

    const flatProviders = countryProviders.flatrate;
    if (!flatProviders || flatProviders.length === 0) return <p className="col-span-2 col-start-1">Aucun fournisseur de streaming disponible</p>;

    return (
      <div className="col-span-4 col-start-1">
        <h2>Disponible sur :</h2>
        <div className="flex flex-wrap gap-4">
          {flatProviders.map(provider => (
            <div key={provider.provider_id} className="flex items-center">
              {provider.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
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
      
      <div className="p-10 items-center min-h-screen bg-gray-100">
        <div
          className="h-[60vh] w-[100vw] bg-cover bg-center bg-fixed relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 text-white">
            <div className="container mx-auto h-full flex items-start justify-end flex-col pb-8">
              <h1 className="text-4xl font-bold mt-10">{movie.title}</h1>
              {movie.tagline && (
                    <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                  )}
            </div>
          </div>
        </div>

      <div className="place-content-around m-10 grid grid-cols-6 gap-4 text-center items-center bg-white p-4 rounded-xl shadow-xl">
          <div className="col-span-2 col-start-1">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {genre.name}</span>
            ))}
          </div>
          <p className="col-span-2 col-start-3">Original Title : {movie.original_title} ({movie.original_language})</p>
          <p className="col-span-2 col-start-5">Release Date : {new Date(movie.release_date).getFullYear()}</p>
          <p className="col-span-4 col-start-2 row-span-2">{movie.overview}</p>
           <div className="col-span-1 col-start-1">
              <p>Budget: {movie.budget} </p>
              <p>Revenues: {movie.revenue}</p>
           </div>
           <div className="col-span-2 col-start-3 row-span-2 items-center justify-center">
              <p className="flex items-center justify-center">{movie.vote_average}
              <BsFillStarFill className="ml-2" />
              </p>
              <p>Vote numbers : {movie.vote_count}</p>
           </div>
          {renderProviders()}
          <ul className="col-span-2 col-start-5">Production Companies: 
            {movie.production_companies?.map(company => 
              (<li key={company.id} className="place-items-center">
                <img src={company.logo_path ? `https://image.tmdb.org/t/p/w45${company.logo_path}` : "/placeholder.jpg"} alt={company.name} />
                {company.name}
              </li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}
