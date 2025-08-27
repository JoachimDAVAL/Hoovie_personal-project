import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFilteredMovies } from "../services/api";
import { IMovie } from "../@types";
import * as React from "react";


// We create the interface for the context
// This interface will be used to define the shape of the context value
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

// We create the context using the interface we just defined
// This context will be used to provide the state and functions to the components that need them
const MovieFilterContext = createContext<IMovieFilterContext | undefined>(undefined);

// We create the provider component that will wrap the components that need access to the context
// This provider will manage the state and provide the functions to update it
export function MovieFilterProvider({ children }: { children: ReactNode }) {

  // We create the state variables using the useState hook
  // These state variables will hold the data and functions we need to manage the movie filtering and sorting
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedVoteAverage, setSelectedVoteAverage] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string>("popularity.desc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // We create a function to fetch the movies from the API
  // This function will be called when the component mounts and when the filters change
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
          // We use a Set to filter out duplicate movies based on their IDs
          // This way, we can keep the unique movies in the state
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

  // We use the useEffect hook to call the fetchMovies function when the component mounts and when the filters change
  // This way, we can fetch the movies when the user selects a different genre, year, vote average or sort option
  useEffect(() => {
    
    fetchMovies(true);
  }, [selectedGenre, selectedYear, selectedVoteAverage, selectedSort]);

  const loadMoreMovies = () => {
    if (!isLoading && hasMore) {
      fetchMovies();
    }
  }
  // We return the context provider with the state and functions as value
  // This way, the components that consume the context will have access to the state and functions
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

// We create a custom hook to use the context
// This hook will be used to access the context value in the components that need it
export function useMovieFilter() {
  const context = useContext(MovieFilterContext);
  if (! context) {
    throw new Error("useMovieFilter must be used within a MovieFilterProvider");
  }
  return context;
}
