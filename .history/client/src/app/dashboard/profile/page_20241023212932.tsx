import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";


const ProfilePage = () => {
    return (
        <div>
            <div className="flex items-center justify-center width-full">
                <Avatar>
                <AvatarImage src="/path-to-image.jpg" alt="User Name" />
                </Avatar>
                <div></div>
            </div>
        </div>
    )
}

export default ProfilePage