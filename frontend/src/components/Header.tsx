/// <reference lib="dom" />
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

  const getPxFromVh = (vh: number) => (window.innerHeight * vh) / 100;
  const getPxFromVw = (vw: number) => (window.innerWidth * vw) / 100;

  useEffect(() => {

    const handleScroll = () => {
      setIsFixed(scrollY > 100); 
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setIsTablet(window.innerWidth < 1024);
        setIsLargeTablet(window.innerWidth < 1280);
      };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () =>{ 
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!categoryButtonAvailability.includes(location.pathname)) {
      setIsModalOpen(false);
    }
  }, [location.pathname]);
  

  const buttonVariants = isMobile
    ? {
        top: isFixed ? getPxFromVh(90) : getPxFromVh(15),
        bottom: "auto",
        right: isFixed ? getPxFromVw(40) : getPxFromVw(80),
        left: isFixed ? getPxFromVw(40) : getPxFromVw(0),
        x: 0,
      }
    : isTablet
    ? {
        top: isFixed ? getPxFromVh(85) : getPxFromVh(10),
        right:isFixed ? getPxFromVw(50) : getPxFromVw(80),
        bottom: "auto",
        left: isFixed ? getPxFromVw(45) : getPxFromVw(0),
        x: 0,
      }
    : isLargeTablet
    ? {
        top: isFixed ? getPxFromVh(90) : getPxFromVh(5),
        right: isFixed ? getPxFromVw(50) : getPxFromVw(80),
        bottom: "auto",
        left: isFixed ? getPxFromVw(45) : getPxFromVw(0),
        x: 0,
    }  
    : {
        top: isFixed ? getPxFromVh(80) : getPxFromVh(5),
        right: "auto",
        bottom: isFixed ? getPxFromVh(5) : getPxFromVh(80),
        left: getPxFromVw(95),
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
