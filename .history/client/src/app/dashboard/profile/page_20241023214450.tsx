import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";


const ProfilePage = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-row items-center mb-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
            </div>
    )
}

export default ProfilePage