import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";


const ProfilePage = () => {

    const posts = [
        { id: 1, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 1" },
        { id: 2, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 2" },
        { id: 3, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 3" },
        { id: 4, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 4" },
        { id: 5, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 5" },
        { id: 6, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 6" },
        { id: 7, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 7" },
        { id: 8, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 8" },
        { id: 9, src: "https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg", alt: "Post 9" },
      ];

    return (
        <div className="container mx-auto max-w-3xl p-4">
            {/* Profile Header */}
            <div className="flex flex-row items-center text-center mb-8 space-x-8">
                <Avatar className="mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full w-24 h-24 object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row space-x-4"> 
                        <div className="text-2xl">Carolina Torreblanca</div>
                    <Button className="ml-auto text-red-500 border border-red-500 bg-white  hover:bg-[#FF678B] hover:text-white">
                        Editar perfil
                    </Button>
                    </div>
                   
                    <div className="flex flex-row space-x-4 text-sm text-gray-600 mt-2">
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
            <div className="text-gray-500 text-xs uppercase mb-2">
                Publicaciones
            </div>
            <Separator className="mb-4" />

            {/* Scrollable Area for Posts */}
            <ScrollArea className="h-[400px]">
                <ScrollAreaViewport>
                    <div className="grid grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <img
                                key={post.id}
                                src={post.src}
                                alt={post.alt}
                                className="w-[168px] h-[168px] object-cover"
                            />
                        ))}
                    </div>
                </ScrollAreaViewport>
            </ScrollArea>
        </div>
    )
}

export default ProfilePage;
