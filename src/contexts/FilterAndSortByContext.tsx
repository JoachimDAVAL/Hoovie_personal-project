import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFilteredMovies } from "../services/api";
import { IMovie } from "../@types";

interface IMovieFilterContext {
  movies: IMovie[];
  selectedGenre: number | undefined;
  selectedYear: number | undefined;
  selectedVoteAverage: number | undefined;
  selectedSort: string;
  hasMore: boolean;
  setSelectedGenre: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedYear: (year: number | undefined) => void;
  setSelectedVoteAverage: (vote: number | undefined) => void;
  setSelectedSort: (sort: string) => void;
  loadMoreMovies: () => void;
  
}

const MovieFilterContext = createContext<IMovieFilterContext | undefined>(undefined);

export function MovieFilterProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedVoteAverage, setSelectedVoteAverage] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string>("popularity.desc");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const fetchMovies = async (reset = false) => {
    if (isLoading) return;
    setIsLoading(true);

    try {

      if (reset) {
        setMovies([]);
        setPage(1);
        setHasMore(true);
      } 

      const newPage = reset ? 1: page;
      const data = await getFilteredMovies(selectedSort, newPage, selectedGenre, selectedYear, selectedVoteAverage);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => {
          const uniqueMovies = [...new Map([...prevMovies, ...data].map((m) => [m.id, m])).values()];
          return uniqueMovies;

      });
      setPage((prevPage) => prevPage + 1);
    }
    } catch (error) {
      console.error("Erreur lors de la récupération des films : ", error);
      throw new Error("Impossible de récupérer les films");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    
    fetchMovies(true);
  }, [selectedGenre, selectedYear, selectedVoteAverage, selectedSort]);

  const loadMoreMovies = () => {
    if (!isLoading && hasMore) {
      fetchMovies();
    }
  }

  return (
    <MovieFilterContext.Provider
      value={{
        movies,
        hasMore,
        selectedGenre: selectedGenre,
        selectedYear,
        selectedVoteAverage,
        selectedSort,
        setSelectedGenre,
        setSelectedYear,
        setSelectedVoteAverage,
        setSelectedSort,
        loadMoreMovies,
      }}
    >
      {children}
    </MovieFilterContext.Provider>
  );
}

export function useMovieFilter() {
  const context = useContext(MovieFilterContext);
  if (! context) {
    throw new Error("useMovieFilter must be used within a MovieFilterProvider");
  }
  return context;
}
