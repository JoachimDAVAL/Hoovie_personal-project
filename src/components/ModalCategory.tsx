// Modal.tsx
import { useState, useEffect } from 'react';
import { getAllGenres } from '../services/api';
import { IGenre, ModalCategoryProps} from '../@types';
import CategoryCard from './CategoryCard';

export default function Modal ({ isOpen, onClose }: ModalCategoryProps) {

  const [genres, setGenres] = useState<IGenre[]>([]);
  
  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getAllGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);
 if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className=" p-6 rounded-lg w-full w-[100vw] h-[90vh] overflow-y-auto">
        <div>
          <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✖</button>
          <ul className='grid grid-cols-3 gap-4 text-center' onClick={onClose}>
            {genres.map((genre) => <CategoryCard key={genre.id} genre={genre}  />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

