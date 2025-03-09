import logo from '../assets/Logo components.svg';
import categoryIcon from '../assets/category.png';
import { Link } from 'react-router-dom';
import Modal from './ModalCategory';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { IMovie } from '../@types';

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  onResults: (movies: IMovie[]) => void;
}

export default function Header({ query, setQuery, onResults }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header className='place-self-center max-h-20 ml-200'>
        <Link to='/'>
          <div className='flex items-center mr-200 mt-10'>
            <img src={logo} className='max-h-20 mr-5' alt='logo' />
            <h1 className=' text-3xl'>Hoovie</h1>
          </div>
        </Link>
    </header>
    <div className='flex justify-between'>
      <div>
        <img onClick={openModal} src={categoryIcon} alt='logo' className='max-w-15 max-h-10 ml-10 mb-5'/>
      </div>
      <SearchBar query={query} setQuery={setQuery} onResults={onResults} />
    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal}/>

    </div>
  )
}