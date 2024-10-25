// components/Comments.tsx
import React, { FC } from "react";

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
    <div className="flex flex-col space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <img
            src={comment.authorKey}
            alt={comment.likes}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{comment.likes}</p>
            <p className="text-gray-600">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
