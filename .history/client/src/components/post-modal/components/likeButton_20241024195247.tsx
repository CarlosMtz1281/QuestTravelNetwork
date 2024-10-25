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
        <Separator></Separator>
        <div className="flex flex-col p-3 space-y-2">
      <button onClick={toggleLike} className={liked ? "text-[FF678B]" : "text-gray-500"}>
        {liked ? (
          <Heart fill="#FF678B" className="text-[#FF678B]"></Heart>
        ) : (
          <Heart></Heart>
        )}
      </button>
      <p>{likes} {likes === 1 ? "Me gusta" : "Me gustas"}</p>
    </div>
    </div>
  );
};

export default LikeButton;
