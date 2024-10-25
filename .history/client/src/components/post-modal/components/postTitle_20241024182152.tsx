
import React, { FC } from "react";
import { Separator } from "@/components/ui/separator";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-2xl font-bold mb-4 pt-3 pl-3">
        {title}
      </h2>
      <Separator className="p-0 w-[400px]"/>
    </div>
  );
};

export default PostTitle;
