// components/LikeButton.tsx
import React, { useState, FC } from "react";

interface LikeButtonProps {
  initialLikes: number;
}

const LikeButton: FC<LikeButtonProps> = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1); // Unlike the post
    } else {
      setLikes(likes + 1); // Like the post
    }
    setLiked(!liked); // Toggle liked state
  };

  return (
    <div className="flex flex-col p-3 space-x-2">
      <button onClick={toggleLike} className={liked ? "text-red-500" : "text-gray-500"}>
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </button>
      <p>{likes} {likes === 1 ? "Me gusta" : "Me gustas"}</p>
    </div>
  );
};

export default LikeButton;
