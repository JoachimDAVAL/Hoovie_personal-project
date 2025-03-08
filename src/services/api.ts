import axios from "axios";
import { IMovie, IGenre } from "../@types";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_API_KEY}`, 
  },
});

export async function getPopularMovies(page: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/discover/movie', {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: page,
          sort_by: 'popularity.desc',
        }
      }
    );
    return httpResponse.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des films : ", error);
    throw new Error("Impossible de récupérer les films populaires.");
  }
};


export async function getMovieById(id: number) {
  try {
    const httpResponse = await httpRequester.get<IMovie>(`/movie/${id}`);
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ${id} : `, error);
    throw new Error("Impossible de récupérer le film.");
  }
};


export async function getAllGenres() {
  try {
    const httResponse = await httpRequester.get<{ genres: IGenre[] }>('/genre/movie/list');
    return httResponse.data.genres;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres : ", error);
    throw new Error("Impossible de récupérer les genres de films.");
  }
};


export async function getMoviesByGenre(genreId: number, page: number) {
  try {
    const httpResponse = await httpRequester.get(`/discover/movie`, {
      params: {
        with_genres: genreId, 
        language: "en-US",
        sort_by: "popularity.desc",
        page: page,
      },
    });
    return httpResponse.data.results;
  } catch (error) {
    console.error(`Erreur lors de la récupération des films du genre ${genreId} : `, error);
    throw new Error("Impossible de récupérer les films du genre.");
  }
}
