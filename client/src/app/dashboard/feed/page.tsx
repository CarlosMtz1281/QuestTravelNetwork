import React from "react";
import Post from "./components/post";

const url = "https://quest-travel-network.vercel.app/posts";

interface PostType {
  id: string;
  category: string;
  location: string;
  description: string;
  userKey: string;
  link: string;
  comments: Comment[];
  likes: number;
  date: string;
}
interface Comment {
  id: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export default async function Feed() {
  const response = await fetch(url, {
    method: "GET",
  });

  const postsData = await response.json();

  // Ensure we have an array inside the `data` property
  const posts = Array.isArray(postsData.data) ? postsData.data : [];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 tracking-tight mb-4">
        Feed
      </h1>
      <div className="flex flex-wrap h-full w-full gap-4 items-center justify-around">
        {posts.map((post: PostType, index: React.Key | null | undefined) => (
          <Post
            key={index}
            link={post.link}
            id={post.id}
            date={post.date}
            category={post.category}
            location={post.location}
            description={post.description}
            userKey={post.userKey}
            comments={post.comments}
            likes={post.likes}
          />
        ))}
      </div>
    </div>
  );
}
