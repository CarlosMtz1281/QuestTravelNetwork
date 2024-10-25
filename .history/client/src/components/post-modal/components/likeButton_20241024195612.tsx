// components/LikeButton.tsx
import React, { useState, FC } from "react";
import { Heart } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

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
        <Separator className="w-100%"></Separator>
        <div className="flex flex-col p-3 space-y-2">
      <button onClick={toggleLike} className={`flex items-center justify-center w-8 h-8 rounded-full}`}>
        {liked ? (
          <Heart fill="#FF678B" className="text-[#FF678B]"></Heart>
        ) : (
          <Heart></Heart>
        )}
      </button>
      <p>{likes} {"Me gusta"}</p>
    </div>
    </div>
  );
};

export default LikeButton;
