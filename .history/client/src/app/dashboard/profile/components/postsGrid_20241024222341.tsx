// components/PostsGrid.tsx
import React from "react";

interface PostsGridProps {
  posts: Array<{ id: number; src: string; alt: string }>;
  onPostClick: (post: any) => void; // Callback when a post is clicked
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map((post) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={post.id}
          src={post.src}
          alt={post.alt}
          className="w-[240px] h-[240px] object-cover cursor-pointer"
          onClick={() => onPostClick(post)} // Pass the clicked post to the callback
        />
      ))}
    </div>
  );
};

export default PostsGrid;
