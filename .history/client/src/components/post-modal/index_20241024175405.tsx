// components/PostModal.tsx
import { FC } from 'react';

import CloseButton from './components/closeButton';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, postContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[70%] h-[80%] flex">
      <div className="w-2/3 h-full">
          <img
            src="https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg"
            alt=""
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
       
       <div>
          <CloseButton onClose={onClose} />
       </div>
      </div>
    </div>
  );
};

export default PostModal;
