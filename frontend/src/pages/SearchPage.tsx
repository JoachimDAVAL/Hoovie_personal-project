import { useSearch } from "../contexts/SearchContext";
import MovieCard from "../components/MovieCard";



export default function SearchPage() {
  const { state } = useSearch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:px-10 content-center justify-center items-center place-items-center">
    
      {state.movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

      {/* {hasMore && <div ref={loader} className="text-center">Chargement...</div>} */}
    
    </div>
  )
}