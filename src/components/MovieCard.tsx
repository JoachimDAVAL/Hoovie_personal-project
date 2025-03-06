import { IMovie } from "../@types"

export default function MovieCard({movie}: MovieCardProps) {
  return (
    <div>
    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}  alt={movie.title} className="max-h-200 rounded-xl"/>
    <h2>{movie.title}</h2>
  </div>
  )
}

interface MovieCardProps {
  movie: IMovie;
}