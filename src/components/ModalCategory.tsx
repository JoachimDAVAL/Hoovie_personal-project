import { useState, useEffect, useRef } from 'react';
import { getAllGenres } from '../services/api';
import { IGenre, ModalCategoryProps } from '../@types';
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';
import { useMovieFilter } from '../contexts/FilterAndSortByContext';
import {YearsDropdown, VoteAverageDropdown, SortByDropdown} from './FilterOptions';


export default function Modal({ isOpen }: ModalCategoryProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedGenre, selectedYear, selectedVoteAverage, selectedSort, setSelectedGenre, setSelectedYear, setSelectedVoteAverage, setSelectedSort } = useMovieFilter();

  const toggleGenre = (genreId: number | undefined) => {
    setSelectedGenre((prev: number | undefined) => (prev === genreId ? undefined : genreId));
  };
  

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

      <div>
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
            <div 
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`cursor-pointer transition-all duration-300 flex-shrink-0 w-48 p-4 text-2xl text-center border-2 border-gray-600 text-white rounded-lg transform hover:scale-105 ${selectedGenre === genre.id ? "bg-[#C32126]" : "bg-black"}`}
          >
            {genre.name}
          </div>

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

      <div className='flex justify-between my-5'>

        <SortByDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />

        <div className='mr-20'>
          <YearsDropdown selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

          <VoteAverageDropdown selectedVoteAverage={selectedVoteAverage} setSelectedVoteAverage={setSelectedVoteAverage} />
        </div>
  
      </div>

    </div>
  );
};
