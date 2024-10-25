import React, { FC } from "react";
import { ChevronLeft } from 'lucide-react';


interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute top-2 left-2 bg-[#F8F8F8] text-gray-500 hover:text-gray-700 w-8 h-8 rounded-lg flex items-center justify-center"
    >
      <ChevronLeft/>
    </button>
  );
};

export default CloseButton;
