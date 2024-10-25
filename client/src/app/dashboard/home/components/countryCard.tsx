import React from "react";
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
import "../styles.css";

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
}

interface CountryCardProps {
  selectedCountry: {
    country: Country | null;
  };
  onPostSelect: (post: Post) => void; // Callback to handle post selection
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

const posts: Post[] = [
  {
    location: "MX, Cancun",
    img: "https://i.pinimg.com/originals/27/2c/b5/272cb5fa82fae045f1b72361a7d3c999.jpg",
    likes: 80,
    description:
      "Cancun is a city in southeastern Mexico on the northeast coast of the Yucatán Peninsula in the Mexican state of Quintana Roo.",
    author: "John Doe",
  },
  {
    location: "MX, Yucatan",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHM6sJnDfOAXe5_iIcLmYI3sKQCdsimKa5ig&s",
    likes: 68,
    description:
      "Yuc is a state in southeastern Mexico that is situated on the northern part of the Yucatán Peninsula.",
    author: "Jane Doe",
  },
  {
    location: "MX, Tulum",
    img: "https://media.tacdn.com/media/attractions-splice-spp-360x240/12/33/ce/ad.jpg",
    likes: 25,
    description:
      "Tulum is a town on the Caribbean coastline of Mexico’s Yucatán Peninsula. It’s known for its beaches and well-preserved ruins of an ancient Mayan port city.",
    author: "John Doe",
  },
];

const CountryCard: React.FC<CountryCardProps> = ({
  selectedCountry,
  onPostSelect,
}) => {
  const { country } = selectedCountry || {};

  return (
    <Card>
      {country ? (
        <>
          <div
            className="flex items-center justify-between"
            style={{ width: "100%" }}
          >
            <div className="flex items-center">
              <span
                className={`fi fi-${country?.id.toLowerCase()}`}
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
              <Star className="text-[#FFD875]" fill="#FFD875" />{" "}
              <p
                style={{ marginLeft: "5px", color: "#fff", fontWeight: "bold" }}
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
            <div
              className="mt-4 flex overflow-x-auto space-x-4 max-w-[400px] scrollbar-hide"
              style={{}}
            >
              {categories.map((category) => (
                <CategoryItem
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  color={category.color}
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
              onClick={() => {}}
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
            <p>Share your adventures in the country you visited </p>
          </div>
        </>
      ) : (
        <span>No country selected</span>
      )}
    </Card>
  );
};

export default CountryCard;
