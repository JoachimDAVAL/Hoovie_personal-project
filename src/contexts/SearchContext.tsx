import { createContext, useContext, useReducer, ReactNode } from "react";
import { IMovie } from "../@types";

interface SearchState {
  query: string;
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  // page: number;
}

type SearchAction = 
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_MOVIES"; payload: IMovie[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

  const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
    switch (action.type) {
      case "SET_QUERY":
        return { ...state, query: action.payload };
      case "SET_MOVIES":
        return { ...state, movies: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  const SearchContext = createContext<{ state: SearchState; dispatch: React.Dispatch<SearchAction> } | undefined>(undefined);
  
  export function SearchProvider({ children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(searchReducer, {
      query: "",
      movies: [],
      loading: false,
      error: null,
    });

    return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>;
  }

  export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
  }
