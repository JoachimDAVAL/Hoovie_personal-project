import { MovieCardProps } from "../@types"
import { Link } from "react-router-dom"
// import { IMovie } from "../@types";

export default function MovieCard({movie}: MovieCardProps) {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}  alt={movie.title} className="max-h-200 rounded-xl"/>
        <h2 className="text-center font-extrabold text-2xl">{movie.title}</h2>
      </Link>
    </div>
  )
}
