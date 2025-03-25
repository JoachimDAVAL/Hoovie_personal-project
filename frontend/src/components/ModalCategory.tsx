import React, { useState, useEffect, useRef } from 'react';
import { getAllGenres } from '../services/api';
import { IGenre, ModalCategoryProps } from '../@types';
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';
import { useMovieFilter } from '../contexts/FilterAndSortByContext';
import {YearsDropdown, VoteAverageDropdown, SortByDropdown} from './FilterOptions';
import { AnimatePresence, motion } from 'motion/react';
import SearchBar from './SearchBar';


export default function ModalCategory({ isOpen }: ModalCategoryProps) {
  console.log("Rendering ModalCategory");
  const [genres, setGenres] = useState<IGenre[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedGenre, selectedYear, selectedVoteAverage, selectedSort, setSelectedGenre, setSelectedYear, setSelectedVoteAverage, setSelectedSort } = useMovieFilter();


  const modalVariants = {
    visible: { opacity: 1},
    hidden: { opacity: 0  },
  };


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
      console.log(genres);
      setGenres(genres);
    };

    fetchGenres();
  }, []);




  return (
    <AnimatePresence mode='popLayout' >
    <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }} 
    className="fixed mt-30 w-full flex justify-center z-150">

      

        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: .3 }}
            className='place-items-center px-30'
          >
          <SearchBar />

          <div className='max-w-[40vh] md:max-w-7xl'>
   
            <button
              onClick={() => scroll('left')}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full ml-5 "
            >
              <motion.img whileTap={{ scale: 1 }} whileHover={{ scale: 1.5 }} src={leftArrow} alt='left arrow' className='max-h-20 cursor-pointer' />
            </button>


            <div className="overflow-x-hidden whitespace-nowrap py-4 px-2 ">
              <div
                ref={scrollRef}                                                                                                                                                     
                className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hidden "
              >
                {genres.map((genre) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`cursor-pointer flex-shrink-0 w-30 md:w-60 p-4 text-2xl text-center border-2 border-gray-600 text-white rounded-lg ${selectedGenre === genre.id ? "bg-[#C32126]" : "bg-black"}`}
                >
                  {genre.name}
                </motion.div>

              ))}
            </div>
          </div>


          <button
            onClick={() => scroll('right')}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full "
          >
            <motion.img whileTap={{ scale: 1 }} whileHover={{ scale: 1.5 }} src={rightArrow} alt='right arrow' className='max-h-20 cursor-pointer'/>
          </button>

          </div>

          <div className='flex mt-5 mr-20 items-center '>

            <SortByDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />

            <div className='flex ml-20'>
              <YearsDropdown selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

              <VoteAverageDropdown selectedVoteAverage={selectedVoteAverage} setSelectedVoteAverage={setSelectedVoteAverage} />
            </div>
      
          </div>
        
        </motion.div>
        )}

      

    </motion.div>
    </AnimatePresence>
  );
};
