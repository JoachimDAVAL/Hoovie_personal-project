import { useState, useEffect, useRef } from 'react';
import { getAllGenres } from '../services/api';
import { IGenre, ModalCategoryProps } from '../@types';
import CategoryCard from './CategoryCard';
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';

export default function Modal({ isOpen }: ModalCategoryProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 800;
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full ml-5 "
      >
        <img src={leftArrow} alt='left arrow' className='max-h-10 hover:scale-150 transform duration-300 cursor-pointer' />
      </button>

      {/* Conteneur avec éléments défilants */}
      <div className="overflow-x-hidden whitespace-nowrap py-4 px-2 mx-20">
        <div
          ref={scrollRef}                                                                                                                                                     
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          {genres.map((genre) => (
            <CategoryCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full mr-5"
      >
     <img src={rightArrow} alt='right arrow' className='max-h-10 hover:scale-150 transform duration-300 cursor-pointer'/>
      </button>

    </div>
  );
};
