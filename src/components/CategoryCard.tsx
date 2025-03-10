import { Link } from 'react-router-dom';
import { IGenre } from '../@types';


interface GenreCardProps {
  genre: IGenre;
}


export default function CategoryCard({ genre }: GenreCardProps) {
  return (
    <div>
      <Link to={`/movies/genre/${genre.id}`}>
         <li className='border rounded-md p-50 bg-black text-white text-3xl' key={genre.id}>{genre.name}</li>
      </Link>
    </div>
  )
}