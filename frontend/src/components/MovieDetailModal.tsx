import { JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  content: string | JSX.Element | null;
  className: string;
  onClose: () => void;
}

export default function MovieDetailModal({ isOpen, content, onClose }: ModalProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  const modalVariants = {
    visible: { opacity: 1, },
    hidden: { opacity: 0, },
  };

  const MIN_WIDTH = 768;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= MIN_WIDTH);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 flex justify-end items-end">
      <AnimatePresence>
        {isOpen && ( 
          isDesktop ? (
          <motion.div className=" p-8 rounded-lg md:w-2/4 h-full overflow-x-auto scroll-smooth"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.5 }}
          >
              <div 
              className="inline m-10 text-5xl text-white font-semibold place-items-center ">{content}</div>
          </motion.div>
        ) : (
          <motion.div
          className="fixed mb-80 inset-0 max-w-[80vh] max-h-[30vh] bg-black/80 items-center p-8 overflow-auto place-self-center rounded-2xl"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.5 }}
          onClick={() => onClose()}
        >
          <div className="text-4xl text-white">
          {content}
          </div>
        </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


