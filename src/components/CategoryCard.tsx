import { Link } from 'react-router-dom';
import { IGenre } from '../@types';


interface GenreCardProps {
  genre: IGenre;
}


export default function CategoryCard({ genre }: GenreCardProps) {
  return (
    <div>
      <Link to={`/movies/genre/${genre.id}`}>
         <div className="flex-shrink-0 w-48 rounded-lg p-4 hover:scale-105 transform transition duration-300 border-2 border-gray-600 bg-black text-white text-2xl text-center" key={genre.id}>{genre.name}</div>
      </Link>
    </div>
  )
}