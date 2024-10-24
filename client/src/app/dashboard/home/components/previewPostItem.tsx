import React from "react";
import { Heart } from "lucide-react";

interface Post {
  location: string;
  img: string;
  likes: number;
}

const PreviewPostItem: React.FC<Post> = ({ location, img, likes }) => {
  return (
    <div>
      <div
        className="relative shadow-md overflow-hidden"
        style={{ borderRadius: "30px", width: "260px", height: "200px" }}
      >
        <img
          src={img}
          alt="post"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3">
          <div className="text-center text-white">
            <p className="font-semibold text-lg">{location}</p>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex items-center justify-center">
          <div
            className="flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <Heart className="text-[#FF0066]" fill="#FF0066" size={30} />
            <span
              className="absolute text-white font-bold"
              style={{
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPostItem;
