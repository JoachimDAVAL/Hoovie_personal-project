import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const TMDB_API_KEY = process.env.TMDB_API_KEY;

const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`, 
  },
});

const APITmdbController = {


  async getPopularMovies(req, res) {
    try {
      const page = req.query.page || 1;
      const response = await httpRequester.get(
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
      res.json(response.data.results);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getMoviesBySearch(req, res) {
    try {
      const query = req.query.query;
      if (!query) return res.status(400).json({ message: "Le paramètre 'query' est requis" });
      const response = await httpRequester.get(
        '/search/movie', {
          params: {
            query: query,
            include_adult: 'false',
            include_video: 'true',
            language: 'en-US',
            page: 1,
  
          }
        });
      res.json(response.data.results);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getMoviesById(req, res) {
    try {
      const { id } = req.params;
      const response = await httpRequester.get(`/movie/${id}`);
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur pour récupérer les genres ceci est la fonction pour récupérer un film par son id" });
    }
  },

  async getProvidersByMovieId(req, res) {
    try {
      const { id } = req.params;
      const response = await httpRequester.get(`/movie/${id}/watch/providers`);
      res.json(response.data.results);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getMovieCredits(req, res) {
    try {
      const { id } = req.params;
      const response = await httpRequester.get(`/movie/${id}/credits`);
      res.json(response.data.cast);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getAllGenres(req, res) {
    try {
      const response = await httpRequester.get('/genre/movie/list', {
        params: {
          language: "en-US",
        }
      });
      res.json(response.data.genres);
    } catch (error) {
      console.error("Erreur API:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getMoviesByGenre(req, res) {
    try {
      const { genreId } = req.params;
      const page = req.query.page || 1;
      const response = await httpRequester.get(`/discover/movie`, {
        params: {
          with_genres: genreId, 
          language: "en-US",
          sort_by: "popularity.desc",
          page: page,
        },
      });
      res.json(response.data.results); 
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getFilteredMovies(req, res) {
    try {
      const { sortBy, genreId, year, voteAverage, page } = req.query;
      const response = await httpRequester.get('/discover/movie', {
        params: {
          language: "en-US",
          sort_by: sortBy,
          page: page,
          with_genres: genreId || undefined,
          primary_release_year: year || undefined,
          "vote_average.gte": voteAverage || undefined,
        },
      });
      res.json(response.data.results);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  },

  async getYears(req, res) {
    try {
      const response = await httpRequester.get('/discover/movie', {
        params: {
          sort_by: "release_date.asc",
          page: 1,
        },
      });
  
      const movies = response.data.results;
  
      if (!movies || movies.length === 0) {
        return res.status(404).json({ message: "Aucun film trouvé." });
      }
  
      const oldestMovie = movies[0];
      if (!oldestMovie || !oldestMovie.release_date) {
        return res.status(404).json({ message: "Aucun film trouvé." });
      }
  
      const oldestYear = parseInt(oldestMovie.release_date.split("-")[0]);
      const currentYear = new Date().getFullYear();
  
      const years = Array.from({ length: currentYear - oldestYear + 1 }, (_, index) => oldestYear + index);
  
      return res.json(years.reverse()); // Renvoie la réponse une seule fois ici
    } catch (error) {
      console.error("Erreur API:", error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({ message: "Erreur API" });
    }
  }
  

};

export default APITmdbController;