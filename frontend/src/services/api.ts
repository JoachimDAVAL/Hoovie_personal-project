import axios from "axios";
import { IMovie, IGenre } from "../@types";

const API_URL = "http://localhost:3000/api"; 

const httpRequester = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
  },
});


// PopularMoviesList Page


export async function getPopularMovies(page: number) {
  try {
    const httpResponse = await httpRequester.get<IMovie[]>(
      '/popular', 
      {
        params: { page },
      }
    );
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des films populaires : ", error);
    throw new Error("Impossible de récupérer les films populaires.");
  }
}

// SearchPage


export async function getMoviesBySearch(query: string) {
  try {
    const httpResponse = await httpRequester.get<IMovie[]>(
      '/search', 
      {
        params: { query },
      }
    );
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la recherche des films : ", error);
    throw new Error("Impossible de récupérer les films recherchés.");
  }
}

// MovieDetail Page


export async function getMovieById(id: number) {
  try {
    const httpResponse = await httpRequester.get<IMovie>(`/${id}`); 
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ${id} : `, error);
    throw new Error("Impossible de récupérer le film.");
  }
}


export async function getProvidersByMovieId(id: number) {
  try {
    const httpResponse = await httpRequester.get(`/${id}/providers`);
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des fournisseurs du film ${id} : `, error);
    throw new Error("Impossible de récupérer les fournisseurs.");
  }
}

export async function getMovieCredits(id: number) {
  try {
    const httpResponse = await httpRequester.get(`/${id}/credits`);
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des crédits du film ${id} : `, error);
    throw new Error("Impossible de récupérer les crédits.");
  }
}

// MoviesByGenre Page


export async function getAllGenres() {
  try {
    const httpResponse = await httpRequester.get<IGenre[]>('/genres');
    console.log(httpResponse);
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres : ", error);
    throw new Error("Impossible de récupérer les genres.");
  }
}


export async function getMoviesByGenre(genreId: number, page: number) {
  try {
    const httpResponse = await httpRequester.get(`/genre/${genreId}`, {
      params: { page },
    });
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des films du genre ${genreId} : `, error);
    throw new Error("Impossible de récupérer les films du genre.");
  }
}

// Filtered Movies
export async function getFilteredMovies(
  sortBy: string,
  page: number,
  genreId?: number,
  year?: number,
  voteAverage?: number
) {
  try {
    const httpResponse = await httpRequester.get<IMovie[]>('/filter', {
      params: {
        sortBy,
        page,
        genreId,
        year,
        voteAverage,
      },
    });
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des films filtrés : ", error);
    throw new Error("Impossible de récupérer les films filtrés.");
  }
}

// Years Request
export async function getYears() {
  try {
    const httpResponse = await httpRequester.get<number[]>('/years');
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des années : ", error);
    throw new Error("Impossible de récupérer les années.");
  }
}
