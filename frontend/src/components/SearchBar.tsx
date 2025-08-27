import { useEffect, useCallback, useRef } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { getMoviesBySearch } from "../services/api";
import * as React from "react";



export default function SearchBar() {
  const { state, dispatch } = useSearch();
  const navigate = useNavigate();

  const lastQuery = useRef("");


  const fetchMovies = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery === lastQuery.current) {
        return;
      }
      if (searchQuery.length < 3) {
        dispatch({ type: "SET_MOVIES", payload: [] });
        return;
      }

      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const data = await getMoviesBySearch(searchQuery);
        dispatch({ type: "SET_MOVIES", payload: data });
        lastQuery.current = searchQuery; 
      } catch (error) {
        console.error("Error fetching movies:", error);
        dispatch({ type: "SET_ERROR", payload: "Unable to fetch movies." });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (state.query.length >= 3 && !state.loading) {
      fetchMovies(state.query);
    }
    return () => fetchMovies.cancel();
  }, [state.query, fetchMovies, state.loading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_QUERY", payload: (e.target as HTMLInputElement).value });
    navigate("/search");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={state.query}
        onChange={handleSearchChange}
        className="mx-auto rounded-xl pl-5 shadow-xs border-solid max-h-10 lg:min-w-80 bg-white py-1 hover:shadow-xl outline-none focus:ring-4 focus:ring-white"
      />

      {state.loading && <span className="ml-2 text-blue-500 animate-spin">⏳</span>}
      {state.error && <p className="text-red-500 absolute top-full left-0">{state.error}</p>}

    </div>

  );
}
