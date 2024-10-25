// components/PostModal.tsx
"use client";

import React, { FC, useState } from "react";

import CloseButton from './components/closeButton';
import PostTitle from './components/postTitle';
import Comments from './components/comment';
import CommentInput from "./components/inputComment";
import LikeButton from "./components/likeButton";


interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: {
    link: string,
    description: string,
    likes: number,
    date: number,
    location: string,
    category: string,
    comments: Array<{
      id: number, 
      authorKey: string,
      comment: string,
      likes: number
    }>
  }
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, postContent }) => {
  const [comments, setComments] = useState(postContent.comments);  // State to store comments

  // Handle comment submission
  const handleCommentSubmit = (newComment: string) => {
    const newCommentObj = {
      id: comments.length + 1,  // Just a simple id for the new comment
      name: "You",  // Assuming the current user is commenting
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",  // Placeholder avatar
      text: newComment,
    };

    // Update the comments state
    setComments([...comments, newCommentObj]);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[70%] h-[80%] flex">

      {/* Post Image */}
        <div className="w-1/2 h-full">
          <img
            src={postContent.link}
            alt=""
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        <div className='w-1/2 h-full flex flex-col overflow-y-auto'>
          <PostTitle title={postContent.location}></PostTitle>
          <p>{postContent.description}</p>

          <div>
            <Comments comments={postContent.comments} />  {/* Pass comments */}
          </div>

          <div className="absolute bottom-0">
            <LikeButton initialLikes={postContent.likes} />  {/* Use LikeButton */}
            <CommentInput onSubmit={handleCommentSubmit} />
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
