// Modal.tsx
import { useState, useEffect } from 'react';
import { getAllGenres } from '../services/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Genre {
  id: number;
  name: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

  const [genres, setGenres] = useState<Genre[]>([]);
  
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
          <ul className='grid grid-cols-3 gap-4 text-center'>
            {genres.map((genre) => (
              <li className='border rounded-md p-50 bg-black text-white text-3xl' key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
