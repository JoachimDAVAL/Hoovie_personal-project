import axios from "axios";
import { IMovie } from "../@types";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_API_KEY}`, 
  },
});

export async function getPopularMovies() {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/discover/movie', {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc',
        }
      }
    );
    
    return httpResponse.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des films : ", error);
    throw new Error("Impossible de récupérer les films populaires.");
  }
}

