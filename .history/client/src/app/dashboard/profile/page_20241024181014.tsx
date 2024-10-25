"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PostModal from "@/components/post-modal";

const ProfilePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null); // Reset selected post when modal closes
  };

  const postContent = {
    imgSource: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
    description: "A beautiful view of the Shulgan-Tash cave, known for its cave paintings from ancient civilizations.",
    likes: 45,
    date: 1634083200, // Unix timestamp for the date (this one is an example)
    location: "Shulgan-Tash cave, Russia",
    category: "Nature",
  };
  

  const posts = [
    {
      id: 1,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 1",
    },
    {
      id: 2,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 2",
    },
    {
      id: 3,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 3",
    },
    {
      id: 4,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 4",
    },
    {
      id: 5,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 5",
    },
    {
      id: 6,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 6",
    },
    {
      id: 7,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 7",
    },
    {
      id: 8,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 8",
    },
    {
      id: 9,
      src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg",
      alt: "Post 9",
    },
  ];

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

      {/* Area for Posts */}
     
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={post.id}
                src={post.src}
                alt={post.alt}
                className="w-[240px] h-[240px] object-cover cursor-pointer"
                onClick={() => openModal(post)} // Open modal when clicked
              />
            ))}
          </div>
      

      {/* Modal for the selected post */}
      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        postContent={selectedPost ? selectedPost.alt : ""} // Dynamically show post content
      />
    </div>
  );
};

export default ProfilePage;
