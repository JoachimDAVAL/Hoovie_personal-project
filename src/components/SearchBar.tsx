import { useState } from "react";
import { getMoviesBySearch } from "../services/api";
import { IMovie } from "../@types";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onResults: (movies: IMovie[]) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      try {
        const movies = await getMoviesBySearch(query, 1);
        console.log("Résultats de la recherche : ", movies);  // Log des résultats
        onResults(movies); // Passe les résultats à la fonction onResults
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    }
  };
  

  return (
    <form onSubmit={handleSearch}>
      <input 
        type='text' 
        placeholder='Search...' 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='mr-80 rounded-xl border-solid shadow-xl max-h-10 min-w-80'
      />
    </form>
  );
}
