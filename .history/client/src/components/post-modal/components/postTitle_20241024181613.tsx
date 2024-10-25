
import React, { FC } from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <DividerHorizontalIcon></DividerHorizontalIcon>
    </div>
  );
};

export default PostTitle;
