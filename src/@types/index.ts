export interface IMovie {
  id: number;
  title: string;
  poster_path: string | null; 
  overview: string;
  release_date: string;
  vote_average?: number; 
  vote_count?: number; 
  original_language?: string; 
  original_title?: string; 
  genres?: { id: number; name: string }[];
  backdrop_path?: string | null; 
  budget?: number; 
  revenue?: number;  
  production_companies?: { id: number; name: string; logo_path: string }[]; 
  tagline?: string; 
}

export interface ModalCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
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

export interface IProvider {
  provider_id: number;
  provider_name: string;
  logo_path?: string;
  display_priority: number;
  _id?: string;
}

export interface IWatchProviders {
  [countryCode: string]: {  
    flatrate?: IProvider[];  
    rent?: IProvider[];     
    buy?: IProvider[];      
  };
}

export interface IActors {
  cast_id: number;
  name: string;
  character: string;
  credit_id: string
}
