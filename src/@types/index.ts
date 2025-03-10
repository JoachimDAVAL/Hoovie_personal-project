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
  genre_ids?: number[]; // Liste des genres (ex: [28, 12] => Action, Aventure)
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