import { Router } from "express";
import APITmdbController from "./controllers/APITmdbController.js";

const router = Router();

router.get('/popular', APITmdbController.getPopularMovies);

router.get('/search', APITmdbController.getMoviesBySearch);

router.get('/genres', APITmdbController.getAllGenres);

router.get('/filter', APITmdbController.getFilteredMovies);

router.get('/years', APITmdbController.getYears);

router.get('/:id', APITmdbController.getMoviesById);

router.get('/:id/providers', APITmdbController.getProvidersByMovieId);

router.get('/:id/credits', APITmdbController.getMovieCredits);

router.get('/genre/:id', APITmdbController.getMoviesByGenre);



export default router;