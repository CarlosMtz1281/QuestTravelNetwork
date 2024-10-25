// components/CommentInput.tsx
import React, { FC, useState } from "react";
import { Separator } from "@/components/ui/separator";

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
    <>
    <Separator className=""></Separator>
    <div className="flex flex-row p-2 pt-0 space-y-3">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Agrega un comentario..."
        className="w-[432px] focus:outline-none focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-white text-gray-400 py-2 hover:text-black"
      >
        Publicar
      </button>
    </div>
    </>
  );
};

export default CommentInput;