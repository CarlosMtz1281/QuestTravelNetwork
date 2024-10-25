
import React, { FC } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row space-y-2">
      <h2 className="text-2xl font-bold mb-4 p-3">
        {title}
      </h2>
      <Separator className="mb-4"/>
    </div>
  );
};

export default PostTitle;
