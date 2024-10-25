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
    <div className="flex flex-row">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Agrega un comentario..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 w-full bg-white text-white py-2 rounded-lg"
      >
        Publicar
      </button>
    </div>
  );
};

export default CommentInput;