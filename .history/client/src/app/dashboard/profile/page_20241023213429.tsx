import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";


const ProfilePage = () => {
    return (
        <div>
            <div className="flex flex-row">
                <Avatar>
                    <AvatarImage src="/path-to-image.jpg" alt="User Name" />
                </Avatar>
                <div className="flex flex-column">
                    <div className="flex flex-row">
                        <p>Carolina Torreblanca</p>
                        <Button></Button>
                    </div>
                    <div className="flex flex-row"></div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage