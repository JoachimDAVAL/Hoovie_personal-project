import { useParams } from "react-router-dom";
import { IMovie, IWatchProviders, IActors} from "../@types";
import { useEffect, useState, JSX } from "react";
import { getMovieById, getProvidersByMovieId, getMovieCredits } from "../services/api";
import Star from "../assets/Star.webp";
import MovieDetailModal from "../components/MovieDetailModal";

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [providers, setProviders] = useState<IWatchProviders>({});
  const [actors, setActors] = useState<IActors[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [hoveredContent, setHoveredContent] = useState<string | JSX.Element | null>(null);


  const handleMouseEnter = (content: string | JSX.Element) => {
    setHoveredContent(content);
    setShowModal(true);
  };

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

    const fetchActors = async () => {
      try {
        const data = await getMovieCredits(Number(id));
        setActors(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des acteurs :", error);
      }
    };


    fetchMovie();
    fetchProviders();
    fetchActors();
  }, [id]);


  const budget = movie?.budget ? new Intl.NumberFormat('en-US').format(movie.budget) : 'N/A';
  const revenue = movie?.revenue ? new Intl.NumberFormat('en-US').format(movie.revenue) : 'N/A';

  if (!movie) {
    return <div className="fixed inset-0 flex justify-center items-center"> <div className="loader"></div> </div>;
    
  }

  const renderProviders = () => {
    const countryProviders = providers['FR']; 
    if (!countryProviders) return <p className="col-span-2">Aucun fournisseur disponible</p>;

    return (
        <div className="col-span-2 grid grid-cols-2 gap-4 place-items-center">

          {!countryProviders.rent || countryProviders.rent.length === 0 ? <p className="col-start-1">No renting providers</p> 
        :
        <div className="col-start-1 flex flex-wrap gap-4 ">
          <button onMouseEnter={() => handleMouseEnter(
            <div className="flex flex-wrap place-items-end">
              {countryProviders.rent?.map(provider => (
              <div key={provider.provider_id} className="mr-10 mt-5 place-items-center">
                {provider.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="h-8 mr-2 rounded-lg"
                  />
                )}
                <p>{provider.provider_name}</p>
              </div>
              
          ))}
            </div>
          )} className="text-xl px-8 py-2 bg-[#B8B08D] rounded-full shadow-xl hover:bg-[#202C39] hover:text-white hover:cursor-pointer hover:animate-bounce">Rent</button>
        </div>
        }


        {!countryProviders.flatrate || countryProviders.flatrate.length === 0 ? <p className="col-start-2">No streaming providers</p> 
        :
          <div className="flex flex-wrap gap-4 col-start-2">
          <button onMouseEnter={() => handleMouseEnter(
            <div className="flex flex-wrap place-items-end ">
              {countryProviders.flatrate?.map(provider => (
                <div key={provider.provider_id} className="mr-10 mt-5 place-items-center">
                  {provider.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="h-8 mr-2 rounded-lg "
                    />
                  )}
                  <p>{provider.provider_name}</p>
                </div>
              ))}
            </div>
          )} className="text-xl px-8 py-2 bg-[#B8B08D] rounded-full shadow-xl hover:bg-[#202C39] hover:text-white hover:cursor-pointer hover:animate-bounce">Stream</button>

            
          </div>
}
        
        
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
              <div>
                <h1 className="text-4xl font-bold mt-10">{movie.title}</h1>
                {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                  )}
              </div>
              < MovieDetailModal isOpen={showModal} content={hoveredContent} />
            </div>
  
          </div>
        </div>

        <div className="movie-detail-description place-content-around m-10 grid grid-cols-3 gap-10 text-center items-center bg-white p-4 rounded-xl shadow-xl">

         <div className="col-span-1 col-start-1 row-span-2 place-items-center">
            <div className="  bg-contain bg-center bg-no-repeat flex flex-col items-center justify-center p-4"
            style={{
              backgroundImage: `url(${Star})`,
              width: "300px", 
              height: "300px", 
            }}
            >

              <p className="text-4xl font-bold">
                  {movie.vote_average}
              </p>
       
            </div>
            <p className="text-sm">Vote count: {movie.vote_count}</p>
          </div>

          <div className="col-start-2">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-gray-100 rounded-full text-l mr-2">
                {genre.name}</span>
            ))}
          </div>

          <p className="col-start-2 text-xl rounded-xl shadow-lg p-10">{movie.overview}</p>

          <div className="col-start-3 row-start-1 row-span-3">
            <p className="text-xl">Original Title : {movie.original_title} ({movie.original_language})</p>
            <p className="mb-10 text-xl">{new Date(movie.release_date).getFullYear()}</p>
            <div className="mb-10 text-xl">
              <p>Budget: {budget} $ </p>
              <p>Revenues: {revenue} $</p>
            </div>

            <div className="flex flex-col items-center">

              <button onMouseEnter={() => handleMouseEnter(
                <div className="flex flex-wrap items-end">
                  {actors?.map(actor => 
                  <p key={actor.cast_id} className="m-1">
                    {actor.name}, 
                  </p>)}
                </div>
              )}
              className="mb-10 text-xl px-8 py-2 bg-[#B8B08D] rounded-full shadow-xl hover:bg-[#202C39] hover:text-white hover:cursor-pointer hover:animate-bounce"
              > Actors 
              </button>

              <button onMouseEnter={() => handleMouseEnter(
                  <div className="flex flex-wrap place-items-end">
                    {movie.production_companies?.map(company => 
                    (<p key={company.id} className="mr-10 mt-5 place-items-center">
                      <img src={company.logo_path ? `https://image.tmdb.org/t/p/w45${company.logo_path}` : "/placeholder.jpg"} alt={company.name} />
                      {company.name}
                    </p>))}
                  </div>
              )} className="mb-10 text-xl px-8 py-2 bg-[#B8B08D] rounded-full shadow-xl hover:bg-[#202C39] hover:text-white hover:cursor-pointer hover:animate-bounce"
              > Production Companies
              </button>

            </div>



          </div>

          {renderProviders()}
          
        </div>
      </div>
    </div>
  );
}
