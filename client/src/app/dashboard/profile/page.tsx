"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PostModal from "@/components/post-modal";
import { randomUUID } from "crypto";

interface Comment {
  id: number, 
  authorKey: string,
  comment: string,
  likes: number
}

interface Post {
  category: string;
  comments: Comment[];
  date: string;
  description: string;
  likes: number;
  link: string;
  location: string;
  userKey: string;
}

const ProfilePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([] as Post[]); // Store posts from Firestore
  const [loading, setLoading] = useState(true); // Loading state

  const userKey = "user001"; // Replace with the actual userKey you want to use

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading state here
      try {
        const response = await fetch("http://localhost:5002/getMyPosts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "userKey": userKey,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setPosts(result.data); // Set the fetched posts
        } else {
          console.error("Error fetching posts:", result.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Stop loading state here
      }
    };

    fetchPosts();
  }, []); // Make sure fetchPosts only runs on mount

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null); // Reset selected post when modal closes
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      {/* Profile Header */}
      <div className="flex flex-row items-center text-center mb-8 space-x-12">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="rounded-full w-28 h-28 object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row space-x-16">
            <div className="text-3xl">Carolina Torreblanca</div>
            <Button className="ml-auto text-[#FF678B] border border-[#FF678B] bg-white hover:bg-[#FF678B] hover:text-white">
              Editar perfil
            </Button>
          </div>

          <div className="flex flex-row space-x-14 text-lg mt-2">
            <div className="flex flex-row items-center space-x-1">
              <p className="font-bold">2</p>
              <p>publicaciones</p>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <p className="font-bold">30</p>
              <p>seguidores</p>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <p className="font-bold">27</p>
              <p>seguidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="text-gray-500 text-sm uppercase mb-2">Publicaciones</div>
      <Separator className="mb-4" />

      {/* Posts Grid */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <img
              key={crypto.randomUUID()}
              src={post.link}
              alt={post.description}
              className="w-[240px] h-[240px] object-cover cursor-pointer"
              onClick={() => openModal(post)} // Open modal with selected post data
            />
          ))}
        </div>
      )}

      {/* Post Modal */}
      {isModalOpen && selectedPost && (
        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          postContent={selectedPost} // Pass the selected post data to the modal
        />
      )}
    </div>
  );
};

export default ProfilePage;