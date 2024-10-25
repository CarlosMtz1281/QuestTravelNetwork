// components/Comments.tsx
import React, { FC } from "react";
import { Heart } from "lucide-react";
interface Comment {
  id: number;
  authorKey: string;
  comment: string;
  likes: number;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col space-y-3">
          <div className="flex flex-row space-x-2 items-center">
          <img
            src={comment.authorKey}
            alt=""
            className="w-10 h-10 rounded-full"
          />
            <p className="font-semibold">Jose Manuel Valles</p>
            <div className="flex flex-row text-gray-350 space-x-1 items-center pl-4">
                <p className="text-sm">{comment.likes}</p>
                <Heart className="w-4 h-4"></Heart>
            </div>
          </div>
          <p className="text-gray-600">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
