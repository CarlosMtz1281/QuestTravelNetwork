import React, { FC } from "react";


interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
    >
      &times;
    </button>
  );
};

export default CloseButton;
