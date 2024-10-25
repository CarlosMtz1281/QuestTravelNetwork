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
    <div className="flex flex-col">
      <div className="flex flex-row space-y-2 items-center space-between p-3">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>
        <p className="text-gray-500">{formatDate(date)}</p> {/* Display formatted date */}
      </div>
      <Separator></Separator>
    </div>
  );
};

export default PostTitle;
