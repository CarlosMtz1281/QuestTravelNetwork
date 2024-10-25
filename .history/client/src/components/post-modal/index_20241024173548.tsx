// components/PostModal.tsx
import { FC } from 'react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, postContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="mt-4">
          <p>{postContent}</p>
        </div>
        <div className="mt-6 flex justify-end">
        </div>
      </div>
    </div>
  );
};

export default PostModal;
