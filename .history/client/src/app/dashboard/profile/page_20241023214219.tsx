import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";


const ProfilePage = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-row items-center mb-4">
                <Avatar>
                    <AvatarImage src="/path-to-image.jpg" alt="User Name" />
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p>Carolina Torreblanca</p>
                        <Button></Button>
                    </div>
                    <div className="flex flex-row space-x-4">
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