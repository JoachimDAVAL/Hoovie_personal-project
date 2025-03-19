import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFilteredMovies } from "../services/api";
import { IMovie } from "../@types";

interface IMovieFilterContext {
  movies: IMovie[];
  selectedGenre: number | undefined;
  selectedYear: number | undefined;
  selectedVoteAverage: number | undefined;
  selectedSort: string;
  setSelectedGenre: (genreId: number | undefined) => void;
  setSelectedYear: (year: number | undefined) => void;
  setSelectedVoteAverage: (vote: number | undefined) => void;
  setSelectedSort: (sort: string) => void;
}

const MovieFilterContext = createContext<IMovieFilterContext | undefined>(undefined);

export function MovieFilterProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedVoteAverage, setSelectedVoteAverage] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string>("popularity.desc");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getFilteredMovies(selectedSort, selectedGenre, selectedYear, selectedVoteAverage);
      setMovies(data);
    };
    fetchMovies();
  }, [selectedGenre, selectedYear, selectedVoteAverage, selectedSort]);

  return (
    <MovieFilterContext.Provider
      value={{
        movies,
        selectedGenre: selectedGenre,
        selectedYear,
        selectedVoteAverage,
        selectedSort,
        setSelectedGenre,
        setSelectedYear,
        setSelectedVoteAverage,
        setSelectedSort,
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
