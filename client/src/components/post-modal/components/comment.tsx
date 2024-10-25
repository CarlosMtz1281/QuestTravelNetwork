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
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt=""
            className="w-10 h-10 rounded-full"
          />
            <p className="font-semibold">Jose Manuel Valles</p>
            <div className="flex flex-row text-gray-300 space-x-1 items-center pl-3">
                <p className="text-sm">32</p>
                <Heart className="w-4 h-4"></Heart>
            </div>
          </div>
          <p className="text-gray-600">A truly amazing example of the creation of nature, the Kapova cave with cave paintings of ancient people with...</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
