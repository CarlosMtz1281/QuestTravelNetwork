// components/PostModal.tsx
import { FC } from 'react';

import CloseButton from './components/closeButton';
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
    comments: [{
      id: string,
      authorKey: string,
      comment: string,
      likes: number
    }]
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

        <div className='w-1/2 h-full flex flex-col overflow-y-auto'>
          <PostTitle title={postContent.location}></PostTitle>

          <div className="mb-4">
            <Comments comments={postContent.comments} />  {/* Pass comments */}
          </div>

        </div>
      
    
       <div>
          <CloseButton onClose={onClose} />
       </div>
      </div>
    </div>
  );
};

export default PostModal;
