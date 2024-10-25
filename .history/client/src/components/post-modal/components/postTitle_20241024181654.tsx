
import React, { FC } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <Separator></Separator>
    </div>
  );
};

export default PostTitle;
