import { MovieCardProps } from "../@types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="max-h-200 rounded-xl" 
        />
        <h2 className="text-center font-extrabold text-2xl">{movie.title}</h2>
      

      {showDetails && (
        <Link to={`/movie/${movie.id}`}>
        <div className="absolute bg-white bg-opacity-100 top-0 left-0 right-0 bottom-0 text-white p-4 rounded-xl flex flex-col justify-around items-center">
          <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="max-h-200 rounded-xl opacity-40 hover:opacity-40 transition-opacity duration-400" 
        />
        <div className="absolute text-black m-10 text-center">
          <h3 className="font-bold text-4xl mb-30">{movie.title}</h3>
          <p className="text-lg">{movie.overview}</p>
          <p className="mt-2 text-sm mb-10 mt-10">Release: {movie.release_date}</p>
          <p className="flex text-3xl justify-center items-center font-bold">
            {movie.vote_average}
            <BsFillStarFill className="ml-2" />
            </p>
          </div>
        </div>
        </Link>
      )}
    </div>
  );
}
