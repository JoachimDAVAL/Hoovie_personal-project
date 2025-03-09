import axios from "axios";
import { IMovie, IGenre } from "../@types";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_API_KEY}`, 
  },
});


// PopularMoviesList Page


// Request to get popular movies from the API
export async function getPopularMovies(page: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/movie/popular', {
        params: {
          include_adult: 'true',
          include_video: 'true',
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


// Request to get movies with search fonctionality
export async function getMoviesBySearch(query: string, page: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/search/movie', {
        params: {
          query: query,
          include_adult: 'true',
          include_video: 'true',
          language: 'en-US',
          page: page,

        }
      });
      return httpResponse.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des films : ", error);
    throw new Error("Impossible de récupérer les films populaires.");
  }
}



// MovieDetail Page


// Request to get a movie by its ID
export async function getMovieById(id: number) {
  try {
    const httpResponse = await httpRequester.get<IMovie>(`/movie/${id}`);
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ${id} : `, error);
    throw new Error("Impossible de récupérer le film.");
  }
};

// Requets to get the providers by movie ID
export async function getProvidersByMovieId(id: number) {
  try {
    const httpResponse = await httpRequester.get(`/movie/${id}/watch/providers`);
    return httpResponse.data.results;
  }catch (error) {
    console.error(`Erreur lors de la récupération des fournisseurs du film ${id} : `, error);
    throw new Error("Impossible de récupérer les fournisseurs du film.");
  }
};




// MoviesByGenre Page


// Request to get all genres from the API
export async function getAllGenres() {
  try {
    const httResponse = await httpRequester.get<{ genres: IGenre[] }>('/genre/movie/list');
    return httResponse.data.genres;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres : ", error);
    throw new Error("Impossible de récupérer les genres de films.");
  }
};

// Request to get movies by genre
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
