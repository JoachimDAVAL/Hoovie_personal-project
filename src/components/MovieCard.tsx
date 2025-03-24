import { MovieCardProps } from "../@types";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { motion } from "motion/react";
import defaultImage from "../assets/defaultImage.jpg";

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <motion.div
      className="relative place-items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={constraintsRef}
      
    >
      <motion.div 
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
    >
      
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : defaultImage
          }
          alt={movie.title}
          className="w-[100] h-[200] md:w-[200] md:h[300]  lg:w-[350px] lg:h-[400px] 2xl:w-[350px] 2xl:h-[500px] object-cover rounded-xl" 
          loading="lazy"
        />
        <h2 className="movie-title text-center font-extrabold text-2xl">{movie.title}</h2>
      

      {showDetails && (
        <Link to={`/movie/${movie.id}`}>
          <div 
          className="absolute bg-white bg-opacity-100 top-0 left-0 right-0 bottom-0 text-white p-4 rounded-xl flex flex-col justify-around items-center shadow-md overflow-hidden transition-transform hover:scale-105 duration-500"
          style={{backgroundImage: movie.poster_path
            ? `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`
            : `url(${defaultImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
          }}
          >
            <div className="absolute inset-0 bg-white/60 text-black">
              <div className="flex flex-wrap text-black m-10 justify-center content-around">
              <h3 className="font-bold text-4xl mb-10">{movie.title}</h3>
              <p className="text-xl mb-20">{truncateText(movie.overview, 200)}</p>
              <p className="flex text-4xl justify-center items-center font-bold mb-10">
                {movie.vote_average}
                <BsFillStarFill className="ml-2" />
                </p>
              </div>
            </div>

            </div>
        </Link>
      )}

        </motion.div>
    </motion.div>
  );
}
