import { JSX } from "react";

interface ModalProps {
  isOpen: boolean;
  content: string | JSX.Element | null;
}

export default function MovieDetailModal({ isOpen, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex justify-end m-y-30 place-items-end ">
      <div className="p-8 rounded-lg w-2/4 h-1/4 overflow-auto place-items-end">
          <div className=" flex text-lg text-white font-semibold place-items-center ">{content}</div>
      </div>
    </div>
  );
};


