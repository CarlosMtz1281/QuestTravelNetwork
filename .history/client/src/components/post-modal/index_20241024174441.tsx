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
        <div className="flex justify-end">
        </div>
        <div className="mt-4">
          <p>{postContent}</p>
        </div>
        <CloseButton onClose={onClose} />
      </div>
    </div>
  );
};

export default PostModal;
