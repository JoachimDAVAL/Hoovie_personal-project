import axios from "axios";
import { IMovie, IGenre } from "../@types";

// L'URL de ton serveur Express (en développement, tu utilises souvent localhost:5000 ou un port spécifique)
const API_URL = "http://localhost:3000/api"; 

const httpRequester = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
  },
});


// PopularMoviesList Page

// Request pour obtenir les films populaires via ton API Express
export async function getPopularMovies(page: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/popular', // Assure-toi que cette route existe sur ton API Express
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

// Request pour la recherche de films via ton API Express
export async function getMoviesBySearch(query: string) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/search', // Assure-toi que cette route existe sur ton API Express
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

// Request pour obtenir un film par son ID via ton API Express

export async function getMovieById(id: number) {
  try {
    const httpResponse = await httpRequester.get<IMovie>(`/${id}`); // Cette route doit correspondre à ton endpoint Express
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ${id} : `, error);
    throw new Error("Impossible de récupérer le film.");
  }
}



// Providers et Crédits (identique à ton exemple)

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

// Request pour obtenir les genres via ton API Express

export async function getAllGenres() {
  try {
    const httpResponse = await httpRequester.get<{ genres: IGenre[] }>('/genres');
    console.log(httpResponse);
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres : ", error);
    throw new Error("Impossible de récupérer les genres.");
  }
}



// MoviesByGenre Page : Request pour obtenir les films par genre
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
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>('/filter', {
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
    const httpResponse = await httpRequester.get<{ years: number[] }>('/years');
    return httpResponse.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des années : ", error);
    throw new Error("Impossible de récupérer les années.");
  }
}
