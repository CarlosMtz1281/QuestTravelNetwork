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
        <div className="container mx-auto">
            <div className="flex flex-row items-center mb-4">
            <Avatar  className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  className="rounded-full w-24 h-24 object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-row items-center">
                        <p className="text-lg font-bold mr-4">Carolina Torreblanca</p>
                        <Button className="ml-auto text-red-500 border border-red-500">
                        Editar perfil
                        </Button>
                    </div>
                    <div className="flex flex-row space-x-4 text-sm text-gray-600">
                        <div className="flex flex-row space-x-1 text-sm text-gray-600">
                            <p className="font-bold">2</p>
                            <p>publicaciones</p>
                        </div>
                        <div className="flex flex-row space-x-1 text-sm text-gray-600">
                            <p className="font-bold">2</p>
                            <p>seguidores</p>
                        </div>
                        <div className="flex flex-row space-x-1 text-sm text-gray-600">
                            <p className="font-bold">2</p>
                            <p>seguidos</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="text-gray-500 text-xs uppercase mb-2">
                    Publicaciones
                </div>
                <Separator className="mb-4"></Separator>
                <ScrollArea>
                    <ScrollAreaViewport>
                    <div className="grid grid-cols-3 gap-4">
                    {posts.map((post) => (
                    <img
                        key={post.id}
                        src={post.src}
                        alt={post.alt}
                        className="w-[168px] h-[168px] object-cover m-0"
                    />
                    ))}
                </div>
                    </ScrollAreaViewport>
                </ScrollArea>
                
            </div>
    )
}

export default ProfilePage