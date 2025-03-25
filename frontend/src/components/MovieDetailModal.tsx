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
    <div className="absolute inset-0 flex justify-end m-y-30 place-items-end ">
      <AnimatePresence>
        {isOpen && (
          <motion.div className=" w-50 p-8 rounded-lg md:w-2/4 h-2/2 md:h-1/4 overflow-auto place-items-end"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.5 }}
          >
              <div className=" flex text-lg text-white font-semibold place-items-center ">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


