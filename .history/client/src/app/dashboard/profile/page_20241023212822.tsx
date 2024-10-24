import React from "react";
import { Avatar } from "@radix-ui/react-avatar";


const ProfilePage = () => {
    return (
        <div>
            <div className="flex items-center justify-center width-full">
                <Avatar src="https://github.com/shadcn.png"></Avatar>
                <div></div>
            </div>
        </div>
    )
}

export default ProfilePage