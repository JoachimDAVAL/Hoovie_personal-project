import { JSX } from "react";

interface ModalProps {
  isOpen: boolean;
  content: string | JSX.Element | null;
}

export default function Modal({ isOpen, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex justify-end bg-opacity-100 m-y-30 place-items-end">
      <div className="bg-white p-8 rounded-lg w-1/3 h-1/3 overflow-auto">
          <div className=" flex text-lg text-black font-semibold">{content}</div>
      </div>
    </div>
  );
};


