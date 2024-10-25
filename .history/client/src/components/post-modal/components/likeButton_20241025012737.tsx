// components/LikeButton.tsx
import React, { useState, FC } from "react";
import { Heart } from 'lucide-react';


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
    <div>
        <div className="flex flex-col p-3 space-y-2">
      <button onClick={toggleLike} className={`w-8 h-8 rounded-full}`}>
        {liked ? (
          <Heart fill="#FF678B" className="text-[#FF678B]"></Heart>
        ) : (
          <Heart className="text-gray-500"></Heart>
        )}
      </button>
      <div className="flex flex-row text-gray-500 space-x-1">
        <p className="font-bold">{likes}</p>
        <p>Me gusta</p>
      </div>
     
    </div>
    </div>
  );
};

export default LikeButton;
