import { useState, useEffect, useRef } from 'react';
import { getAllGenres } from '../services/api';
import { IGenre, ModalCategoryProps } from '../@types';
import CategoryCard from './CategoryCard';

export default function Modal({ isOpen }: ModalCategoryProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getAllGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="relative">

      {/* Flèche gauche */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full"
      >
        &lt;
      </button>

      {/* Conteneur avec éléments défilants */}
      <div className="overflow-x-hidden whitespace-nowrap py-4 px-2">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {genres.map((genre) => (
            <CategoryCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full"
      >
        &gt;
      </button>

    </div>
  );
};
