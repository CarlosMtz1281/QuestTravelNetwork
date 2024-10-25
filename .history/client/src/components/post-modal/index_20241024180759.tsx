// components/PostModal.tsx
import { FC } from 'react';

import CloseButton from './components/closeButton';
import { array } from '@amcharts/amcharts5';
import PostTitle from './components/postTitle';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: {
    imgSource: string,
    description: string,
    likes: number,
    date: number,
    location: string,
    category: string,
  }
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, postContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[70%] h-[80%] flex">

      {/* Post Image */}
        <div className="w-1/2 h-full">
          <img
            src={postContent.imgSource}
            alt=""
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
       
      <PostTitle title={postContent.title}></PostTitle>

       <div>
          <CloseButton onClose={onClose} />
       </div>
      </div>
    </div>
  );
};

export default PostModal;
