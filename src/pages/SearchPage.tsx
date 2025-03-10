import { useSearch } from "../contexts/SearchContext";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const { state } = useSearch();

  return (
    <div className="grid grid-cols-4 gap-4 pl-10 pr-10">
    
      {state.movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

      {/* {hasMore && <div ref={loader} className="text-center">Chargement...</div>} */}
    
    </div>
  )
}