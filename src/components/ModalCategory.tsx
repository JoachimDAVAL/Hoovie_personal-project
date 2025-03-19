import { useState, useEffect, useRef } from 'react';
import { getAllGenres, getYears } from '../services/api';
import { IGenre, ModalCategoryProps } from '../@types';
import CategoryCard from './CategoryCard';
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';
import { useMovieFilter } from '../contexts/FilterAndSortByContext';

export default function Modal({ isOpen }: ModalCategoryProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedGenre, selectedYear, selectedVoteAverage, selectedSort, setSelectedGenre, setSelectedYear, setSelectedVoteAverage, setSelectedSort } = useMovieFilter();


  const sortByOptions = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Vote average desc' },
    { value: 'vote_average.asc', label: 'Vote average asc' },
    { value: 'release_date.desc', label: 'Release date desc' },
    { value: 'release_date.asc', label: 'Release date asc' },
  ];

  const votesOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ]

  function SortByDropdown({ selectedSort, setSelectedSort }: { selectedSort: string; setSelectedSort: (value: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className='relative inline-block'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      >
        <div className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => setSelectedSort('')}
        >
          {sortByOptions.find((option) => option.value === selectedSort)?.label || 'Sort by'}
        </div>

        {isOpen && (
          <ul className="absolute left-0 mt-1 bg-white shadow-lg rounded w-48 border border-gray-300 z-50">
            {sortByOptions.map((option) => (
              <li key={option.value} onClick={() => setSelectedSort(option.value)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  };

  function VoteAverageDropdown({ selectedVoteAverage, setSelectedVoteAverage }: { selectedVoteAverage: number | undefined; setSelectedVoteAverage: (value: number | undefined) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className='relative inline-block'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      >
        <div className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => setSelectedVoteAverage(undefined)}
        >
          {votesOptions.find((vote) => vote.value === selectedVoteAverage)?.label || 'Vote'}
        </div>

        {isOpen && (
          <ul className="absolute left-0 mt-1 bg-white shadow-lg rounded w-48 border border-gray-300 z-50">
            {votesOptions.map((vote) => (
              <li key={vote.value} onClick={() => setSelectedVoteAverage(vote.value)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {vote.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  };

  function YearsDropdown({ selectedYear, setSelectedYear }: { selectedYear: number | undefined; setSelectedYear: (value: number | undefined) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className='relative inline-block'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      >
        <div className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => setSelectedYear(undefined)}>
          {selectedYear || 'Years'}
        </div>

        {isOpen && (
          <ul className="absolute left-0 mt-1 bg-white shadow-lg rounded w-48 border border-gray-300 overflow-y-auto max-h-48 z-50">
            {years.map((year) => (
              <li key={year} onClick={() => setSelectedYear(year)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {year}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
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

    const fetchYears = async () => {
      const years = await getYears();
      setYears(years);
    };

    fetchGenres();
    fetchYears();
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
            <div key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            >
            <CategoryCard key={genre.id} genre={genre} />
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

      <div>

        <YearsDropdown selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

        <VoteAverageDropdown selectedVoteAverage={selectedVoteAverage} setSelectedVoteAverage={setSelectedVoteAverage} />

        <SortByDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>

    </div>
  );
};
