import logo from '../assets/Logo components.svg';
import categoryIcon from '../assets/category.png';
import { Link, useLocation } from 'react-router-dom';
import ModalCategory from './ModalCategory';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
  const [isLargeTablet, setIsLargeTablet] = useState(window.innerWidth < 1280);
  const location = useLocation();

  const categoryButtonAvailability = ["/", "/search"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsFixed(scrollY > 100); 
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setIsTablet(window.innerWidth < 1024);
        setIsLargeTablet(window.innerWidth < 1280);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonVariants = isMobile
    ? {
        top: isFixed ? "90vh" : "10vh",
        bottom: "auto",
        right: isFixed ? "20vh" : "auto",
        left: isFixed ? "auto" : "0vh",
        x: 0,
      }
    : isTablet
    ? {
        top: isFixed ? "85vh" : "10vh",
        right:isFixed ? "33vh" : "65vh",
        bottom: isFixed ? "auto" : "0vh",
        left: "auto",
        x: 0,
      }
    : isLargeTablet
    ? {
        top: isFixed ? "90vh" : "5vh",
        right: isFixed ? "33vh" : "67vh",
        bottom: isFixed ? "auto" : "0vh",
        left: "auto",
        x: 0,
    }  
    : {
        top: isFixed ? "80vh" : "auto",
        right: "auto",
        bottom: isFixed ? "auto" : "80vh",
        left: "200vh",
        x: 0,
      };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='bg-white bg-opacity-90 mb-10'>

      <header className='place-self-center max-h-20 mx-auto px-4'>
        <Link to='/'>
          <div className='flex justify-center mx-auto mt-10'>
            <img src={logo} className='max-h-20 mr-5' alt='logo' />
            <h1 className=' text-6xl font-bold'>Hoovie</h1>
          </div>
        </Link>
      </header>
    
        { categoryButtonAvailability.includes(location.pathname) && (
          <motion.button
        onClick={openModal}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        animate={{ ...buttonVariants }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed shadow-lg z-150 w-20 h-20 p-4 text-white rounded-full md:bg-white md:mt-10"
      >
        <img src={categoryIcon} alt='logo' className=' cursor-pointer' />
      </motion.button>
    )}

      <ModalCategory isOpen={isModalOpen} />
    </div>
  );
}
