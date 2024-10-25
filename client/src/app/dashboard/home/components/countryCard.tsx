"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../elements";
import "flag-icons/css/flag-icons.min.css";
import {
  Star,
  Leaf,
  UtensilsCrossed,
  Gem,
  PersonStanding,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryItem from "./categoryItem";
import PreviewPostItem from "./previewPostItem";
import NewPostModal from "./newPostModal";

const url = "https://quest-travel-network.vercel.app/posts";

interface Country {
  id: string;
  name: string;
}

interface Post {
  location: string;
  img: string;
  likes: number;
  description: string;
  author: string;
  imgSource: string;
  date: number;
  category: string;
  comments: {
    id: number;
    authorKey: string;
    comment: string;
    likes: number;
  }[];
}

interface CountryCardProps {
  selectedCountry: {
    country: Country | null;
  };
  onPostSelect: (post: Post | null) => void;
}

const categories = [
  {
    name: "Nature",
    icon: <Leaf className="text-[#fff]" />,
    color: "#8DE8C7",
  },
  {
    name: "Gastro",
    icon: <UtensilsCrossed className="text-[#fff]" />,
    color: "#EB5757",
  },
  {
    name: "Hidden",
    icon: <Gem className="text-[#fff]" />,
    color: "#48ADF5",
  },
  {
    name: "Solo",
    icon: <PersonStanding className="text-[#fff]" />,
    color: "#F57C48",
  },
  {
    name: "Budget",
    icon: <Receipt className="text-[#fff]" />,
    color: "#F548A7",
  },
];

const CountryCard: React.FC<CountryCardProps> = ({
  selectedCountry,
  onPostSelect,
}) => {
  const { country } = selectedCountry;
  const [category, setCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openNewPostModal, setOpenNewPostModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!country) return;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorKey: "user001",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const mappedPosts: Post[] = data.data
          .filter((post: any) => post.location === country?.id)
          .map((post: any) => ({
            location: post.location,
            img: post.link,
            likes: post.likes,
            description: post.description,
            author: post.userKey,
            imgSource: post.link,
            date: post.date,
            category: post.category || "Country",
            comments: post.comments || [],
          }));
        const filteredPosts = category
          ? mappedPosts.filter((post) => post.category === category)
          : mappedPosts;

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [country, category]);

  const handleCategoryClick = (name: string) => {
    setCategory((prevCategory) => (prevCategory === name ? null : name));
  };

  return (
    <>
      <Card>
        {country ? (
          <>
            <div
              className="flex items-center justify-between"
              style={{ width: "100%" }}
            >
              <div className="flex items-center">
                <span
                  className={`fi fi-${country.id.toLowerCase()}`}
                  style={{
                    fontSize: "3rem",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  }}
                ></span>
                <h1 className="ml-4 font-bold" style={{ fontSize: "30px" }}>
                  {country.name}
                </h1>
              </div>
              <div
                className="flex items-center"
                style={{
                  border: "solid 1px #FF0066",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  backgroundColor: "#FF0066",
                }}
              >
                <Star className="text-[#FFD875]" fill="#FFD875" />
                <p
                  style={{
                    marginLeft: "5px",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  5.0
                </p>
              </div>
            </div>
            <div
              style={{
                border: "solid 1px rgba(0, 0, 0, 0.06)",
                width: "100%",
                margin: "30px",
              }}
            />
            <div style={{ marginTop: "20px" }}>
              <h1 className="ml-4 font-bold" style={{ fontSize: "20px" }}>
                Category
              </h1>
              <div className="mt-4 flex overflow-x-auto space-x-4 max-w-[400px] scrollbar-hide">
                {categories.map((cat) => (
                  <CategoryItem
                    key={cat.name}
                    name={cat.name}
                    icon={cat.icon}
                    color={cat.color}
                    setCategory={handleCategoryClick}
                    isSelected={category === cat.name} // Pass selected state
                  />
                ))}
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h1 className="ml-4 font-bold" style={{ fontSize: "20px" }}>
                Popular
              </h1>
              <div className="mt-4 flex overflow-x-auto space-x-4 max-w-[400px] scrollbar-hide">
                {posts.map((post) => (
                  <PreviewPostItem
                    key={post.location}
                    location={post.location}
                    img={post.img}
                    likes={post.likes}
                    onClick={() => onPostSelect(post)}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                padding: "20px",
                width: "100%",
              }}
            >
              <Button
                style={{
                  width: "100%",
                  height: "60px",
                  borderRadius: "30px",
                  border: "solid 1px #FF678B",
                  backgroundColor: "#fff",
                  color: "#FF678B",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
                onClick={() => setOpenNewPostModal(true)}
              >
                Post
                <img
                  src={"/Add.png"}
                  alt="addIcon"
                  style={{ width: "15%", height: "auto" }}
                />
              </Button>
            </div>
            <div style={{ padding: "15px", color: "gray" }}>
              <p>Share your adventures in the country you visited.</p>
            </div>
          </>
        ) : (
          <span>No country selected</span>
        )}
      </Card>
      <NewPostModal
        isOpen={openNewPostModal}
        onClose={() => setOpenNewPostModal(false)}
      />
    </>
  );
};

export default CountryCard;
