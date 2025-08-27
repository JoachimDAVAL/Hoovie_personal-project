import { JSX } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  content: string | JSX.Element | null;
  className: string;
}

export default function MovieDetailModal({ isOpen, content }: ModalProps) {

  const modalVariants = {
    visible: { opacity: 1, },
    hidden: { opacity: 0, },
  };

  return (
    <div className="absolute inset-0 flex justify-end items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div className=" p-8 rounded-lg md:w-2/4 h-full overflow-x-auto scroll-smooth"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.5 }}
          >
              <div className="inline m-10 text-5xl text-white font-semibold place-items-center ">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


