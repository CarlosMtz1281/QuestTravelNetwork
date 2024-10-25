import React, { FC } from "react";
import { Separator } from "@/components/ui/separator";

interface PostTitleProps {
  title: string;
  date: string;
}

// Function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const PostTitle: FC<PostTitleProps> = ({ title, date }) => {
  return (
    <div className="flex flex-row space-y-2">
      <h2 className="text-2xl font-bold mb-4 pt-3 pl-3 pb-0">
        {title}
      </h2>
      <p className="text-gray-500 pl-3">{formatDate(date)}</p> {/* Display formatted date */}
    </div>
  );
};

export default PostTitle;
