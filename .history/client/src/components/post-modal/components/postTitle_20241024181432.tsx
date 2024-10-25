
import React, { FC } from "react";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <h2 className="text-2xl font-bold mb-4">
      {title}
    </h2>
  );
};

export default PostTitle;
