import axios from "axios";
import { IMovie, IGenre } from "../@types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`, 
  },
});


// PopularMoviesList Page


// Request to get popular movies from the API
export async function getPopularMovies(page: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/movie/popular', {
        params: {
          include_adult: 'false',
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



// SearchPage

// Request to get movies with search fonctionality
export async function getMoviesBySearch(query: string) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/search/movie', {
        params: {
          query: query,
          include_adult: 'false',
          include_video: 'true',
          language: 'en-US',
          page: 1,

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
    console.log(httpResponse.data);
    return httpResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ${id} : `, error);
    throw new Error("Impossible de récupérer le film.");
  }
};

// Request to get the providers by movie ID
export async function getProvidersByMovieId(id: number) {
  try {
    const httpResponse = await httpRequester.get(`/movie/${id}/watch/providers`);
    // console.log(httpResponse.data.results);
    return httpResponse.data.results;
  }catch (error) {
    console.error(`Erreur lors de la récupération des fournisseurs du film ${id} : `, error);
    throw new Error("Impossible de récupérer les fournisseurs du film.");
  }
};

//  Request to get the movie credits
export async function getMovieCredits(id: number) {
  try {
    const httpResponse = await httpRequester.get(`/movie/${id}/credits`);
    return httpResponse.data.cast;
  } catch (error) {
    console.error(`Erreur lors de la récupération des crédits du film ${id} : `, error);
    throw new Error("Impossible de récupérer les crédits.");
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
};


// Request to filter movies by genre, release_date, vote_average and to sort them by popularity, release_date or vote_average
export async function getFilteredMovies(sortBy: string = "popularity.desc", genreId?: number, year?: number, voteAverage?: number) {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>('/discover/movie', {
      params: {
        language: "en-US",
        sort_by: sortBy,
        page: 1,
        with_genres: genreId || undefined,
        primary_release_year: year || undefined,
        "vote_average.gte": voteAverage || undefined,
      },
    });
    return httpResponse.data.results
  } catch (error) {
    console.error(`Erreur lors de la récupération des films filtrés : `, error);
    throw new Error("Impossible de récupérer les films filtrés.");
  }
};

// Request to get oldest movie by year and then generate an array with all the years between the oldest and the current year
export async function getYears() {
  try {
    const httpResponse = await httpRequester.get('/discover/movie', {
      params: {
        sort_by: "release_date.asc",
        page: 1,
      },
    });

    const oldestMovie = httpResponse.data.results[0];
    const oldestYear = oldestMovie ? parseInt(oldestMovie.release_date.split("-")[0]) : 1900;

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - oldestYear + 1 }, (_, index) => oldestYear + index);

    return years;
  } catch (error) {
    console.error("Erreur lors de la récupération des années : ", error);
    throw new Error("Impossible de récupérer les années.");
  }
}



