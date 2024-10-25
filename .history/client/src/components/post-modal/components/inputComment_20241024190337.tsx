// components/CommentInput.tsx
import React, { FC, useState } from "react";

interface CommentInputProps {
  onSubmit: (comment: string) => void;  // Function to handle comment submission
}

const CommentInput: FC<CommentInputProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);  // Call the onSubmit function passed as a prop
      setComment("");  // Clear the input field after submission
    }
  };

  return (
    <div className="flex flex-row p-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Agrega un comentario..."
        className="w-full py-2 focus:outline-none focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-white text-gray-500 py-2 hover: text-blue-500"
      >
        Publicar
      </button>
    </div>
  );
};

export default CommentInput;
