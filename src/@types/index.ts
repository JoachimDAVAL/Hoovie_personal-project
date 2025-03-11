export interface IMovie {
  id: number;
  title: string;
  poster_path: string | null; // Certaines entrées peuvent ne pas avoir d'image
  overview: string;
  release_date: string;
  vote_average?: number; // Optionnel, utile pour afficher les notes
  vote_count?: number; // Nombre de votes, utile pour filtrer par popularité
  original_language?: string; // Permet d'afficher le drapeau du pays
  original_title?: string; // Pour voir le titre original
  genres?: { id: number; name: string }[]; // Liste des genres (ex: [28, 12] => Action, Aventure)
  backdrop_path?: string | null; // Image de fond pour la page de détail
  budget?: number; // Budget du film
  revenue?: number; // Recette du film  
  production_companies?: { id: number; name: string; logo_path: string }[]; // Liste des sociétés de production
  tagline?: string; // Slogan du film 
}

export interface ApiResponse<T> {
  results: T[];
}

export interface MovieCardProps {
  movie: IMovie;
}

export interface IGenre {
  id: number;
  name: string
}