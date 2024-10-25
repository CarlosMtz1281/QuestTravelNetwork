
import React, { FC } from "react";
import { Separator } from "@/components/ui/separator";

interface PostTitleProps {
  title: string;
  date: string;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Usage
const readableDate = formatDate("2024-10-25T06:46:18.980Z");
console.log(readableDate); // "October 25, 2024"


const PostTitle: FC<PostTitleProps> = ({ title, date }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-2xl font-bold mb-4 pt-3 pl-3 pb-0">
        {title}
      </h2>
      <Separator className="p-0 w-100%"/>
    </div>
  );
};

export default PostTitle;
