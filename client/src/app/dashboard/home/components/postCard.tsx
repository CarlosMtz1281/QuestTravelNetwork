import React, { useState } from "react";
import { Card } from "../elements";
import { Heart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostModal from "@/components/post-modal";

interface Post {
  location: string;
  img: string;
  likes: number;
  description: string;
  author: string;
  imgSource: string;
  date: number;
  category: string;
  comments: {
    id: number;
    authorKey: string;
    comment: string;
    likes: number;
  }[];
}

interface PostCardProps {
  post: Post;
  onPostSelect: (post: Post | null) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostSelect }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleGoBack = () => {
    onPostSelect(null);
  };

  return (
    <>
      <Card className="rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={post.img}
            alt={post.location}
            className="w-full object-cover"
            style={{ height: "350px", borderRadius: "30px" }}
          />
          <div
            className="absolute top-3 left-3 flex items-center justify-center bg-white p-1 shadow-md cursor-pointer"
            style={{ borderRadius: "10px" }}
            onClick={handleGoBack}
          >
            <ChevronLeft size={20} />
          </div>
          <div
            className="absolute bottom-0 right-3 flex items-center justify-center bg-white rounded-full p-2 shadow-md cursor-pointer"
            onClick={handleToggleLike}
          >
            <Heart
              className="text-[#FF0066]"
              fill={isLiked ? "#fff" : "#FF0066"}
              size={20}
            />
          </div>
          <div
            className="absolute bottom-3 left-3 flex items-center justify-center p-2 shadow-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "30px",
              paddingRight: "30px",
            }}
          >
            <img
              src={post.img}
              alt={post.location}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "60px",
                marginRight: "5px",
              }}
            />
            <span className="text-sm text-white">{post.author}</span>
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold">{post.location}</h1>
          <p className="text-gray-600 mt-2">{post.description}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              padding: "20px",
              width: "100%",
            }}
          >
            <Button
              style={{
                width: "100%",
                height: "60px",
                borderRadius: "30px",
                border: "solid 1px #FF678B",
                backgroundColor: "#FF678B",
                color: "#fff",
                fontSize: "25px",
                fontWeight: "bold",
              }}
              onClick={() => {
                openModal();
              }}
            >
              Comment
              <img
                src={"/Chat.png"}
                alt="addIcon"
                style={{ width: "15%", height: "auto" }}
              />
            </Button>
          </div>
        </div>
      </Card>
      <PostModal isOpen={isModalOpen} onClose={closeModal} postContent={post} />
    </>
  );
};

export default PostCard;
