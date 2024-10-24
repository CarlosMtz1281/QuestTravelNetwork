import React from "react";
import { Avatar, AvatarImage, AvatarFallback, Image } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";


const ProfilePage = () => {

    const posts = [
        { id: 1, src: "/path-to-post1.jpg", alt: "Post 1" },
        { id: 2, src: "/path-to-post2.jpg", alt: "Post 2" },
        { id: 3, src: "/path-to-post3.jpg", alt: "Post 3" },
        { id: 4, src: "/path-to-post4.jpg", alt: "Post 4" },
        { id: 5, src: "/path-to-post5.jpg", alt: "Post 5" },
        { id: 6, src: "/path-to-post6.jpg", alt: "Post 6" },
        { id: 7, src: "/path-to-post7.jpg", alt: "Post 7" },
        { id: 8, src: "/path-to-post8.jpg", alt: "Post 8" },
        { id: 9, src: "/path-to-post9.jpg", alt: "Post 9" },
      ];

    return (
        <div className="container mx-auto">
            <div className="flex flex-row items-center mb-4">
            <Avatar  className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  className="rounded-full w-24 h-24 object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <p className="text-lg font-bold mr-4">Carolina Torreblanca</p>
                        <Button className="ml-auto text-red-500 border border-red-500">
                        Editar perfil
                        </Button>
                    </div>
                    <div className="flex flex-row space-x-4 text-sm text-gray-600">
                        <p>2 publicaciones</p>
                        <p>30 seguidores</p>
                        <p>27 seguidos</p>
                    </div>
                    </div>
                </div>
                <div className="text-gray-500 text-xs uppercase mb-2">
                    Publicaciones
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {posts.map((post) => (
                    <Image
                        key={post.id}
                        src={post.src}
                        alt={post.alt}
                        className="w-full h-auto object-cover"
                    />
                    ))}
                </div>
            </div>
    )
}

export default ProfilePage