import axios from "axios";
import { IMovie } from "../@types";


const httpRequester = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer process.env.REACT_APP_BEARER_TOKEN`, 
  },
});

export async function getPopularMovies() {
  try {
    const httpResponse = await httpRequester.get<{ results: IMovie[] }>(
      '/discover/movie', {
        params: {
          api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjU0ZWM1YjIxMDFhNTZkMmQwNmM3YWRiNzViOGIyYiIsIm5iZiI6MTc0MTIwNzQwMC4yMjg5OTk5LCJzdWIiOiI2N2M4Yjc2ODgyMWMxOWI1ZWJlNzExZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Q31eF_x6D2SE2xlWZ7f_wKNzE4OsqpeOhttyDDtNN5I',
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

